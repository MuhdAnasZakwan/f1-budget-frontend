import axios from "axios";
import { API_URL } from "./constants";

export const uploadTeamCar = async (teamCar) => {
  const formData = new FormData();
  formData.append("image", teamCar);
  const response = await axios.post(API_URL + "teamCar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}