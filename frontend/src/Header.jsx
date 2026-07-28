import React from "react";
import { ChefHat, LogOut } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="brand-mark">
        <span className="brand-icon">
          <ChefHat size={20} strokeWidth={2} />
        </span>

        <span className="brand-word">
          Pantry Muse
        </span>
      </div>

      <div className="header-right">
        <span className="hello-user">
          Hey, {user?.name?.split(" ")[0] || "Guest"}
        </span>

        <button
          className="btn-ghost"
          onClick={onLogout}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </header>
  );
}