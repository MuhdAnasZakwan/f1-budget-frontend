import axios from "axios";
import { API_URL } from "./constants";

export async function getSponsors(team, token) {
  const response = await axios.get(API_URL + "sponsors"+ (team === "all" ? "" : "?team=" + team), {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function getSponsor(id, token) {
  const response = await axios.get(API_URL + "sponsors/" + id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function addSponsor(sponsorName, amount, duration, team, token) {
  const response = await axios.post(API_URL + "sponsors", {
    sponsorName, amount, duration, team
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}

export async function updateSponsor(_id, sponsorName, amount, duration, team, token) {
  const response = await axios.put(API_URL + "sponsors/" + _id, {
    sponsorName, amount, duration, team
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
};

export async function deleteSponsor(_id, token) {
  const response = await axios.delete(API_URL + "sponsors/" + _id, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return response.data;
}