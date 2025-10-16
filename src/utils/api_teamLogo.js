import axios from "axios";
import { API_URL } from "./constants";

export const uploadTeamLogo = async (teamLogo) => {
  const formData = new FormData();
  formData.append("image", teamLogo);
  const response = await axios.post(API_URL + "teamLogo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}