import axios from "axios";
import { BASE_URL, CHANGER_TOKEN } from "../../constants/cons";

const privateInstance = axios.create({
  baseURL: BASE_URL,
});

privateInstance.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANGER_TOKEN}`,
    },
  };
});

privateInstance.interceptors.response.use(
  (response) => {
    if (response & response.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response.status) {
      throw error.response.data;
    }
    return Promise.reject(error);
  }
);

export { privateInstance };
