import axios from "axios";
import { API_URL } from "./constants";

export const uploadDriverImage = async (driverImage) => {
  const formData = new FormData();
  formData.append("image", driverImage);
  const response = await axios.post(API_URL + "driverImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return response.data;
}