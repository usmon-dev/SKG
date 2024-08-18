import axios from "axios";
import { getCookie } from "../../utils/defaults";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-API-Key": import.meta.env.VITE_API_SECRET_KEY,
    Authorization: getCookie("authToken")
  },
});
