import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  console.log("Sending token:", token); // Add this line
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

export const register = (userData) => api.post("/users/register", userData);
export const login = (credentials) => api.post("/users/login", credentials);

export const getExpenses = () => api.get("/expenses");
export const addExpense = (expenseData) => api.post("/expenses", expenseData);
export const getNetWorth = () => api.get("/expenses/net-worth");

export const getRandomQuote = () => api.get("/quotes");

export const getQuiz = () => api.get("/quizzes");
export const submitQuiz = (quizId, answers) =>
  api.post("/quizzes/submit", { quizId, answers });

export const getChallenges = () => api.get("/challenges");
export const createChallenge = (challengeData) =>
  api.post("/challenges", challengeData);
export const updateChallenge = (id, amount) =>
  api.put(`/challenges/${id}`, { amount }).then(response => response);
export const deleteChallenge = (id) => api.delete(`/challenges/${id}`);

export default api;

// import axios from "axios";

// const API_URL = "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// export const register = (userData) => api.post("/users/register", userData);
// export const login = (userData) => api.post("/users/login", userData);
// export const getExpenses = () => api.get("/expenses");
// export const addExpense = (expenseData) => api.post("/expenses", expenseData);
// export const getNetWorth = () => api.get("/users/net-worth");
// export const getQuiz = () => api.get("/quiz");
// export const submitQuiz = (quizId, answers) => api.post(`/quiz/${quizId}/submit`, { answers });
// export const getChallenges = () => api.get("/challenges");
// export const createChallenge = (challengeData) => api.post("/challenges", challengeData);
// export const updateChallenge = (id, amount) => api.put(`/challenges/${id}`, { amount });
// export const deleteChallenge = (id) => api.delete(`/challenges/${id}`);
// export const getRandomQuote = () => api.get("/quotes/random");

// export default api;