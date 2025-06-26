import Cookies from "js-cookie";
import { api, BASE_URL } from "../constants";

export const postGenerate = async ({ payload }) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/${api.generate.post}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
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

export const getMedicalData = async ({ ta_number }) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await fetch(`${BASE_URL}/${api.medical.data}/?ta_number=${ta_number}`, {
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
