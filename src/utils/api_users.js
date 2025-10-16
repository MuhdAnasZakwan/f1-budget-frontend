import axios from "axios";
import { API_URL } from "./constants";

export const signup = async (name, email, password) => {
  const response = await axios.post(API_URL + "users/signup", {
    name: name,
    email: email,
    password: password
  });
  return response.data;
}

export const login = async (email, password) => {
  const response = await axios.post(API_URL + "users/login", {
    email: email,
    password: password
  });
  return response.data;
}