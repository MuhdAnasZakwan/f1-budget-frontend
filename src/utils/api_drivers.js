import axios from "axios";
import { API_URL } from "./constants";

export async function getDrivers(team) {
  const response = await axios.get(API_URL + "drivers" + (team === "all" ? "" : "?team=" + team));
  return response.data;
}

export async function getDriver(id) {
  const response = await axios.get(API_URL + "drivers/" + id);
  return response.data;
}

export async function addDriver(name, nationality, age, team, salary, driverImage, token) {
  const response = await axios.post(API_URL + "drivers", {
    name, nationality, age, team, salary, driverImage
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function updateDriver(_id, name, nationality, age, team, salary, totalPoints, driverImage, token) {
  const response = await axios.put(API_URL + "drivers/" + _id, {
    name, nationality, age, team, salary, totalPoints, driverImage
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function deleteDriver(_id, token) {
  const response = await axios.delete(API_URL + "drivers/" + _id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}