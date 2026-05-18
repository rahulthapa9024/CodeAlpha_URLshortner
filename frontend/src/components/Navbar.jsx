import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {  LogOut, LayoutDashboard, User, HelpCircle, Cpu, } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleScrollToSection = (elementId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
              <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ShortURL
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
  {!user && (
    <>
      <button
        onClick={() => handleScrollToSection("techstack")}
        className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Cpu className="h-4 w-4" /> Tech Stack
      </button>

      <button
        onClick={() => handleScrollToSection("howitworks")}
        className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <HelpCircle className="h-4 w-4" /> How It Works
      </button>
    </>
  )}
</div>

          {/* Action buttons / User profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* User Badge */}
                <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-1.5 border border-slate-800">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 max-w-[120px] truncate">
                    {user.userName || user.email}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-red-950/20 px-4 py-2 text-xs font-bold text-red-400 border border-red-900/30 hover:bg-red-950/40 hover:text-red-300 transition-all duration-200 shadow-md hover:shadow-red-950/10 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-4 py-2 text-sm font-semibold text-white transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/30 hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
