import axios from "axios";

const BASE_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiService = {
  register: (email: string, password: string) => {
    return api.post("/register", { email, password });
  },
  login: (email: string, password: string) => {
    return api.post("/login", { email, password });
  },
  listUsers: (pageNumber: number, pageSize: number = 6) => {
    return api.get(`/users`, {
      params: {
        page: pageNumber,
        per_page: pageSize,
      },
    });
  },
  getUser: (userId: number) => {
    return api.get(`/users/${userId}`);
  },
};

export default apiService;
