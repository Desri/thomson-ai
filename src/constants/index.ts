export const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  auth: {
    register: "register",
    login: "login",
    user: "users"
  },
  summary: {
    list: "summaries"
  },
  generate: {
    post: "summarize"
  },
  medical: {
    data: "medical-data"
  },
  logs: {
    list: "logs",
    types: "logs/action-types"
  }
};
