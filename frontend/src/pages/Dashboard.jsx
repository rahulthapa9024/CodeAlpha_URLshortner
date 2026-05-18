import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

import {
  Link2,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Plus,
  AlertCircle,
  Loader2,
  Calendar,
  History,
  Globe,
  Zap,
} from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [urls, setUrls] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newShortUrl, setNewShortUrl] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [copiedMain, setCopiedMain] = useState(false);

  const fetchUrls = async () => {
    setFetchLoading(true);

    const response = await api.getMyUrls();

    if (response.success) {
      setUrls(response.urls || []);
    }

    setFetchLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setNewShortUrl("");

    if (!originalUrl.trim()) {
      setErrorMessage("Please enter a valid URL");
      return;
    }

    setLoading(true);

    const response = await api.createShortUrl(originalUrl);

    setLoading(false);

    if (response.success) {
      setSuccessMessage("Short URL created successfully");
      setNewShortUrl(response.shortUrl);
      setOriginalUrl("");

      fetchUrls();
    } else {
      setErrorMessage(response.error || "Something went wrong");
    }
  };

  const handleDelete = async (shortCode) => {
    const confirmDelete = window.confirm(
      "Delete this shortened URL?"
    );

    if (!confirmDelete) return;

    const response = await api.deleteShortUrl(shortCode);

    if (response.success) {
      setUrls((prev) =>
        prev.filter((u) => u.shortCode !== shortCode)
      );
    }
  };

  const handleCopy = (text, id, isMain = false) => {
    navigator.clipboard.writeText(text);

    if (isMain) {
      setCopiedMain(true);

      setTimeout(() => {
        setCopiedMain(false);
      }, 2000);
    } else {
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  const filteredUrls = urls.filter(
    (u) =>
      u.originalUrl
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      u.shortCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#030712] text-white">
  
      {/* Animated Background */}
      <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[160px]" />
  
      <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
  
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
  
      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 w-full">
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
  
            <div>
  
              <h1 className="text-4xl font-black tracking-tight">
                Welcome back,
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  {user?.userName || "Creator"}
                </span>
              </h1>
  
              <p className="text-slate-400 mt-3 text-sm md:text-base max-w-2xl">
                Create short links, manage your URLs,
                and track.
              </p>
            </div>
  
            {/* STATS */}
            <div className="grid">
  
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5 min-w-[170px]">
                <div className="flex items-center justify-between">
                  <div className="text-slate-400 text-sm">
                    Total Links
                  </div>
  
                  <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Link2 className="h-5 w-5" />
                  </div>
                </div>
  
                <div className="text-3xl font-black mt-3">
                  {urls.length}
                </div>
              </div>
  
            </div>
          </div>
  
          {/* CREATE CARD */}
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/50 backdrop-blur-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)] mb-8">
  
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Shorten Your Link
                </h2>
  
                <p className="text-slate-400 text-sm">
                  Fast URL shortening.
                </p>
              </div>
            </div>
  
            <form
              onSubmit={handleShorten}
              className="flex flex-col lg:flex-row gap-4"
            >
              <div className="relative flex-1">
  
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Globe className="h-5 w-5" />
                </div>
  
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) =>
                    setOriginalUrl(e.target.value)
                  }
                  placeholder="https://your-amazing-link.com"
                  className="w-full h-16 rounded-2xl border border-slate-800 bg-[#0f172a]/70 pl-14 pr-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className="h-16 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Shorten URL
                  </>
                )}
              </button>
            </form>
  
            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 flex items-center gap-3 text-red-400">
                <AlertCircle className="h-5 w-5" />
                {errorMessage}
              </div>
            )}
  
            {successMessage && newShortUrl && (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
  
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
  
                  <a
                    href={newShortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-semibold break-all hover:underline flex items-center gap-2"
                  >
                    {newShortUrl}
                    <ExternalLink className="h-4 w-4" />
                  </a>
  
                  <button
                    onClick={() =>
                      handleCopy(newShortUrl, null, true)
                    }
                    className={`h-12 px-5 rounded-xl font-semibold transition-all flex items-center gap-2 justify-center ${
                      copiedMain
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white text-black hover:bg-slate-200"
                    }`}
                  >
                    {copiedMain ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
  
          {/* LINKS SECTION */}
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/50 backdrop-blur-2xl p-6 md:p-8">
  
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
  
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <History className="h-6 w-6 text-indigo-400" />
                  Your Links
                </h3>
  
                <p className="text-slate-400 text-sm mt-1">
                  Manage and organize your shortened URLs.
                </p>
              </div>
  
              <div className="relative w-full lg:w-80">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="h-4 w-4" />
                </div>
  
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full h-12 rounded-2xl border border-slate-800 bg-[#0f172a]/70 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>
  
            {fetchLoading ? (
              <div className="py-24 flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
                <p className="text-slate-400">
                  Loading your links...
                </p>
              </div>
            ) : filteredUrls.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-950/30">
  
                <div className="h-20 w-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-5 text-indigo-400">
                  <Link2 className="h-8 w-8 rotate-45" />
                </div>
  
                <h4 className="text-xl font-bold">
                  No links found
                </h4>
  
                <p className="text-slate-400 mt-2 text-sm">
                  Create your first shortened URL above.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 mt-8">
  
                {filteredUrls.map((u) => {
                  const formattedDate = new Date(
                    u.createdAt
                  ).toLocaleDateString();
  
                  return (
                    <div
                      key={u._id}
                      className="group rounded-3xl border border-slate-800 bg-[#0b1220]/80 p-5 hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)] transition-all"
                    >
  
                      <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
  
                        <div className="min-w-0 flex-1">
  
                          <div className="flex flex-wrap items-center gap-3 mb-3">
  
                            <a
                              href={u.shortUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2"
                            >
                              /{u.shortCode}
                              <ExternalLink className="h-4 w-4" />
                            </a>
  
                            <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/70 text-xs text-slate-400 flex items-center gap-1.5">
                              <Calendar className="h-3 w-3" />
                              {formattedDate}
                            </div>
  
                          </div>
  
                          <p className="text-slate-400 truncate text-sm">
                            {u.originalUrl}
                          </p>
  
                        </div>
  
                        <div className="flex items-center gap-3">
  
                          <button
                            onClick={() =>
                              handleCopy(
                                u.shortUrl,
                                u._id
                              )
                            }
                            className={`h-11 w-11 rounded-2xl border transition-all flex items-center justify-center ${
                              copiedId === u._id
                                ? "bg-emerald-500/20 border-emerald-500/20 text-emerald-400"
                                : "bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white"
                            }`}
                          >
                            {copiedId === u._id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
  
                          <button
                            onClick={() =>
                              handleDelete(
                                u.shortCode
                              )
                            }
                            className="h-11 w-11 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
  
                        </div>
  
                      </div>
                    </div>
                  );
                })}
  
              </div>
            )}
          </div>
  
        </div>
      </div>
  
      {/* FOOTER */}
      <Footer />
  
    </div>
  );
}