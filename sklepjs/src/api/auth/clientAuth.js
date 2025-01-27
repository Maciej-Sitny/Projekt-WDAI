const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
