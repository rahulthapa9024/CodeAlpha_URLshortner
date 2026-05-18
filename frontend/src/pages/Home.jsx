import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Database, 
  ArrowRight,
  Link2, 
  Atom, 
  Paintbrush, 
  Server,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
  MousePointer2
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#070a13] text-slate-100 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[1000px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10"></div>

      {/* HERO SECTION */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-20 sm:pt-32 lg:px-8 flex flex-col items-center">

        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl leading-[1.1]">
          Clutter-Free, Instant <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Link Shortening
          </span>
        </h1>
        
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-slate-400 leading-relaxed">
          The professional way to manage your digital link assets. Built for speed, 
          designed for clarity, and stored forever.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
          <Link
            to="/register"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started for Free 
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Dashboard Login
          </Link>
        </div>
      </div>

      {/* TECH STACK SECTION */}
      <section id="techstack" className="mx-auto max-w-7xl px-6 py-32 sm:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">Modern Tech Stack</h3>
          <p className="mx-auto mt-6 max-w-2xl text-slate-400 leading-relaxed">
            Built using industry-standard, high-performance frameworks for modern, scalable platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { Icon: Atom, title: "React & Vite", desc: "Ultra-responsive client logic", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { Icon: Paintbrush, title: "TailwindCSS v4", desc: "Atomic styling architecture", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { Icon: Server, title: "Express & Node", desc: "High-throughput API layer", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { Icon: Database, title: "MongoDB", desc: "Distributed document storage", color: "text-purple-400", bg: "bg-purple-500/10" }
          ].map((item, i) => (
            <div key={i} className="group flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                <item.Icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="howitworks" className="relative mx-auto max-w-7xl px-6 py-32 border-t border-white/5 sm:px-8">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 mb-4">Workflow</h2>
          <h3 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">How This Works</h3>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 relative">
          {/* Vertical/Horizontal Line */}
          <div className="hidden lg:block absolute top-[40px] left-8 right-8 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

          {[
            { step: "01", title: "Create Account", desc: "Sign up instantly to generate your secure private session token." },
            { step: "02", title: "Paste Destination", desc: "Our server sanitizes and runs structure tests on your long URLs." },
            { step: "03", title: "Generate Code", desc: "A custom NanoID collision check assigns a unique 6-character code." },
            { step: "04", title: "Manage & Track", desc: "Route requests automatically and monitor your link performance." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group relative z-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#070a13] border-2 border-slate-800 text-indigo-400 font-bold text-xl mb-8 group-hover:border-indigo-500 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all">
                {item.step}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed px-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-[22px] bg-[#070a13] hover:bg-transparent px-10 py-5 font-bold text-white transition-all group"
            >
              Start Shortening Now 
              <CheckCircle2 className="h-5 w-5 text-indigo-400 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}