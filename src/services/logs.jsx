import Cookies from "js-cookie";
import { api, BASE_URL } from "../constants";

export const getLogs = async () => {
  const token = Cookies.get("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/${api.logs.list}/?page=1&limit=5`, {
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
    console.error('Fetch failed:', error);
    throw error;
  }
};

export const getActionType = async () => {
  const token = Cookies.get("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/${api.logs.types}`, {
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
    console.error('Fetch failed:', error);
    throw error;
  }
};
