import axios from "axios";

// Define your base URL
const BASE_URL = "http://localhost:5000/api/v1/";

// Create an axios instance with the base URL
const api_url = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api_url;
