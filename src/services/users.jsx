import Cookies from "js-cookie";
import { api, BASE_URL } from "../constants";

export const getUsers = async () => {
  const token = Cookies.get("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();

    if (response.status === 401) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    if (!response.ok) {
      const message = data?.message;
      throw new Error(message);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
