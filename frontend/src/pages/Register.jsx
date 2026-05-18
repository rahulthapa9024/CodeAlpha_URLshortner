import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { User, Mail, Lock, Link2, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Register() {
  const { register, error, clearError } = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!userName || !email || !password) {
      setLocalError("All fields are required");
      return;
    }
    if (userName.trim().length < 3) {
      setLocalError("Username must be at least 3 characters");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await register(userName, email, password);
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      if (Array.isArray(result.errors)) {
        const errorMsgs = result.errors.map(err => err.message).join(", ");
        setLocalError(errorMsgs);
      } else {
        setLocalError(result.error || "Registration failed. Try again.");
      }
    }
  };

  const socials = [
    { href: "https://portfolio-ten-xi-mee38qjyjs.vercel.app/", Icon: FaGlobe, label: "Portfolio" },
    { href: "https://github.com/rahulthapa9024", Icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/rahul-thapa-02a168320/", Icon: FaLinkedin, label: "LinkedIn" },
    { href: "mailto:rahulthapa9024@gmail.com", Icon: Mail, label: "Email" },
  ];

  return (
    <div className="flex min-h-screen bg-[#070a13] text-slate-200 selection:bg-indigo-500/30">
      
      {/* LEFT SIDE: Branding & Visuals */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a13]/60 via-[#070a13]/90 to-[#070a13]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <div className="max-w-md">
            <h1 className="text-6xl font-extrabold leading-[1.1] text-white mb-8 tracking-tight">
              Start your journey <br />
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">with Shortenly.</span>
            </h1>
            
            <div className="space-y-6 mb-12">
              {[
                { title: "Free Forever", desc: "Start shortening URLs at no cost." },
                { title: "Real-time Insights", desc: "Track every click as it happens." },
                { title: "Custom Branding", desc: "Create links that match your style." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-1">Designed & Developed by</p>
                <p className="text-white font-medium">Rahul Thapa</p>
              </div>
              <div className="flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* RIGHT SIDE: Register Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-md">

          <div className="mb-12 lg:hidden flex flex-col items-center">
            <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4">
                <Link2 className="h-8 w-8 text-white rotate-45" />
            </div>
            <h2 className="text-2xl font-bold text-white">Shortenly</h2>
          </div>

          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-white tracking-tight">Create Account</h2>
            <p className="mt-3 text-slate-400">Join thousands of users managing their links.</p>
          </div>

          {(localError || error) && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 animate-in fade-in zoom-in duration-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{localError || error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-indigo-500" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="johndoe"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 py-4 pl-12 pr-4 text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-indigo-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 py-4 pl-12 pr-4 text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-indigo-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 py-4 pl-12 pr-4 text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500 ml-1 italic">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative group w-full mt-4 overflow-hidden rounded-2xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-[0.98] disabled:opacity-70 cursor-pointer"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-white hover:text-indigo-400 transition-colors underline decoration-indigo-500/30 underline-offset-4">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}