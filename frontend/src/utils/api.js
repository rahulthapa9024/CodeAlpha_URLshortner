const API_BASE_URL = "http://localhost:3000/user";

/**
 * Custom wrapper around fetch that handles JSON formatting, 
 * credentials (cookies), and common HTTP errors.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set up default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Configure fetch options with credentials: "include" to send/receive cookies
  const config = {
    ...options,
    headers,
    credentials: "include", // Crucial for cookie-based authentication
  };

  if (options.body && typeof options.body === "object") {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Return structured error object
      return {
        success: false,
        error: data.message || `Request failed with status ${response.status}`,
        errors: data.errors || null,
        status: response.status,
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      success: false,
      error: "Unable to connect to the server. Please ensure the backend is running.",
    };
  }
}

export const api = {
  // Authentication
  register: (userData) => request("/register", { method: "POST", body: userData }),
  login: (credentials) => request("/login", { method: "POST", body: credentials }),
  logout: () => request("/logout", { method: "POST" }),

  // Shortener API
  createShortUrl: (originalUrl) => request("/shortURL", { method: "POST", body: { originalUrl } }),
  getMyUrls: () => request("/myURLs", { method: "GET" }),
  deleteShortUrl: (shortCode) => request(`/shortURL/${shortCode}`, { method: "DELETE" }),
};
