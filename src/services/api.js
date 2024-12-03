import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const language = localStorage.getItem("language") || "en";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["Accept-Language"] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await api.post("/auth/refresh-token", {
          token: refreshToken,
        });
        localStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
