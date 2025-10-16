import axios from "axios";
import {API_URL} from "./constants";

export async function getTeams() {
  const response = await axios.get(API_URL + "teams");
  return response.data;
};

export async function getTeam(id) {
  const response = await axios.get(API_URL + "teams/" + id);
  return response.data;
}

export async function addTeam(name, principal, country, teamLogo, teamCar, token) {
  const response = await axios.post(API_URL + "teams", {
    name, principal, country, teamLogo, teamCar
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
};

export async function updateTeam(_id, name, principal, country, budgetCap, balance, championships, teamLogo, teamCar, token) {
  const response = await axios.put(API_URL + "teams/" + _id, {
    name, principal, country, budgetCap, balance, championships, teamLogo, teamCar
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
};

export async function deleteTeam(_id, token) {
  const response = await axios.delete(API_URL + "teams/" + _id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data; 
}