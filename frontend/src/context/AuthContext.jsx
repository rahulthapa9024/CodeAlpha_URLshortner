import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shortenly_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to verify if the stored user session is still valid in backend
  const verifySession = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    // We try to call a protected endpoint (getMyUrls) to verify cookies
    const response = await api.getMyUrls();
    if (!response.success && response.status === 401) {
      // Session expired or invalid on backend
      console.warn("Backend session expired, clearing local auth state");
      setUser(null);
      localStorage.removeItem("shortenly_user");
    }
    setLoading(false);
  };

  useEffect(() => {
    verifySession();
  }, []);

  const login = async (email, password) => {
    setError(null);
    const response = await api.login({ email, password });
    
    if (response.success) {
      setUser(response.user);
      localStorage.setItem("shortenly_user", JSON.stringify(response.user));
    } else {
      setError(response.error);
    }
    return response;
  };

  const register = async (userName, email, password) => {
    setError(null);
    const response = await api.register({ userName, email, password });
    
    if (response.success) {
      setUser(response.user);
      localStorage.setItem("shortenly_user", JSON.stringify(response.user));
    } else {
      setError(response.error || "Registration failed");
    }
    return response;
  };

  const logout = async () => {
    setError(null);
    const response = await api.logout();
    
    // Always clear local state on logout attempt to keep UI responsive
    setUser(null);
    localStorage.removeItem("shortenly_user");
    return response;
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
