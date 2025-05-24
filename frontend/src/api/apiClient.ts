import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Update to your deployed URL if needed
  timeout: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header to each request if token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
