import axios from "axios";
import { API_URL } from "./constants";

export async function getExpenses(team, token) {
  const response = await axios.get(API_URL + "expenses"+ (team === "all" ? "" : "?team=" + team), {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function getExpense(id, token) {
  const response = await axios.get(API_URL + "expenses/" + id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function addExpense(team, type, description, amount, token) {
  const response = await axios.post(API_URL + "expenses", {
    team, type, description, amount
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function updateExpense(_id, team, type, description, amount, token) {
  const response = await axios.put(API_URL + "expenses/" + _id, {
    team, type, description, amount
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function deleteExpense(id, token) {
  const response = await axios.delete(API_URL + "expenses/" + id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}