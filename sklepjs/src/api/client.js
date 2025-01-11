const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/", // adres twojego backendu
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
