import React, { useState } from 'react';
import { ChefHat, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import "./Auth.css";
import axios from "axios";
export default function AuthPage({ onLoginSuccess }) {
  // Mock database for this session
  
  
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [authError, setAuthError] = useState('');

  function updateAuthField(field, value) {
    setAuthForm(f => ({ ...f, [field]: value }));
  }

  async function handleAuthSubmit(e) {
  e.preventDefault();
  setAuthError("");

  try {
    if (authMode === "signup") {

      if (
        !authForm.name ||
        !authForm.email ||
        !authForm.password
      ) {
        setAuthError("Please fill all fields.");
        return;
      }

      if (authForm.password !== authForm.confirm) {
        setAuthError("Passwords do not match.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: authForm.name,
          email: authForm.email,
          password: authForm.password,
        }
      ); 
      console.log("Login response:", res.data);

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

console.log("Token after save:", localStorage.getItem("token"));
console.log("User after save:", localStorage.getItem("user"));

      alert(res.data.message);

      setAuthMode("login");

      setAuthForm({
        name: "",
        email: "",
        password: "",
        confirm: "",
      });

    } else {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: authForm.email,
          password: authForm.password,
        }
      );
console.log("Login Response:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));

      onLoginSuccess(res.data.user);

    }

  } catch (error) {

    setAuthError(
      error.response?.data?.message || "Something went wrong"
    );

  }
}

  

  return (
    <div className="auth-screen">
      <div className="brand-mark">
        <span className="brand-icon"><ChefHat size={22} strokeWidth={2} /></span>
        <span className="brand-word">Pantry Muse</span>
      </div>
      <p className="auth-tagline">Turn what's in your kitchen into tonight's dinner.</p>

      <form className="paper-card auth-card" onSubmit={handleAuthSubmit}>
        <div className="auth-tabs">
          <button type="button" className={authMode === 'login' ? 'tab active' : 'tab'} onClick={() => { setAuthMode('login'); setAuthError(''); }}>Sign in</button>
          <button type="button" className={authMode === 'signup' ? 'tab active' : 'tab'} onClick={() => { setAuthMode('signup'); setAuthError(''); }}>Create account</button>
        </div>

        {authMode === 'signup' && (
          <label className="field">
            <span className="field-label"><UserIcon size={14} /> Name</span>
            <input className="input" type="text" value={authForm.name} onChange={e => updateAuthField('name', e.target.value)} placeholder="Your name" />
          </label>
        )}

        <label className="field">
          <span className="field-label"><Mail size={14} /> Email</span>
          <input className="input" type="email" value={authForm.email} onChange={e => updateAuthField('email', e.target.value)} placeholder="you@kitchen.com" />
        </label>

        <label className="field">
          <span className="field-label"><Lock size={14} /> Password</span>
          <input className="input" type="password" value={authForm.password} onChange={e => updateAuthField('password', e.target.value)} placeholder="••••••••" />
        </label>

        {authMode === 'signup' && (
          <label className="field">
            <span className="field-label"><Lock size={14} /> Confirm password</span>
            <input className="input" type="password" value={authForm.confirm} onChange={e => updateAuthField('confirm', e.target.value)} placeholder="••••••••" />
          </label>
        )}

        {authError && <div className="error-banner"><AlertCircle size={15} /> {authError}</div>}

        <button type="submit" className="btn-primary auth-submit">
          {authMode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        
      </form>
    </div>
  );
}