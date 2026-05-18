import {
    FaGithub,
    FaLinkedin,
    FaGlobe,
  } from "react-icons/fa";
  
  import { Mail, Heart } from "lucide-react";
  
  export default function Footer() {
    const socials = [
      {
        href: "https://portfolio-ten-xi-mee38qjyjs.vercel.app/",
        Icon: FaGlobe,
        label: "Portfolio",
      },
      {
        href: "https://github.com/rahulthapa9024",
        Icon: FaGithub,
        label: "GitHub",
      },
      {
        href: "https://www.linkedin.com/in/rahul-thapa-02a168320/",
        Icon: FaLinkedin,
        label: "LinkedIn",
      },
      {
        href: "mailto:rahulthapa9024@gmail.com",
        Icon: Mail,
        label: "Email",
      },
    ];
  
    return (
      <footer className="relative overflow-hidden border-t border-slate-800 bg-[#030712]">
  
        {/* Background Glow */}
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute right-[-120px] bottom-[-120px] h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
  
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
  
          {/* Top Section */}
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
  
            {/* Brand */}
            <div className="text-center md:text-left">
              <h2 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-black text-transparent">
                Rahul Thapa
              </h2>
  
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                Full Stack Developer building modern web applications,
                AI-powered tools, and beautiful digital experiences.
              </p>
            </div>
  
            {/* Socials */}
            <div className="flex flex-wrap items-center justify-center gap-4">
  
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 text-slate-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
  
            </div>
          </div>
        </div>
      </footer>
    );
  }