import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const updateSalary = (salaryData) =>
  API.post("/user/salary", salaryData);
export const addExpense = (expensedata) =>
  API.post("/user/addexpense", expensedata);
export const deleteExpense = (expensedata) =>
  API.post("/user/deleteexpense", expensedata);

// ✅ New: Edit Expense
export const editExpense = (expensedata) =>
  API.post("/user/editexpense", expensedata);
