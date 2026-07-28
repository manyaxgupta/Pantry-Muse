import { useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  // Logged in user
  const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  // Temporary users (frontend only)
  const [users, setUsers] = useState([
    {
      name: "Guest Cook",
      email: "guest@demo.com",
      password: "demo1234",
    },
  ]);

  // Login
  function handleLogin(user) {
    setCurrentUser(user);
  }

  // Logout
  function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setCurrentUser(null);
}

  // Show Login Page
  if (!currentUser) {
    return (
      <Auth
        users={users}
        setUsers={setUsers}
        onLoginSuccess={handleLogin}
      />
    );
  }

  // Show Dashboard after login
  return (
    <Dashboard
      user={currentUser}
      onLogout={handleLogout}
    />
  );
}

export default App;