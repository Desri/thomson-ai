import Cookies from "js-cookie";
import { api, BASE_URL } from "../constants";
import { useAuthStore } from "../store/profileStore";

const setUser = useAuthStore.getState().setUser;
const setIsLogin = useAuthStore.getState().setIsLogin;

export const postRegister = async ({ payload }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('CHECK ERROR')
      const message = data?.message;
      throw new Error(message);
    } else {
      Cookies.set('accessToken', data.data.access_token, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set('role', data.data.role, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      setUser(data.data);
      setIsLogin(true);
    }
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const postLogin = async ({ payload }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      console.log('CHECK ERROR')
      const message = data?.message;
      throw new Error(message);
    } else {
      Cookies.set('accessToken', data.data.access_token, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set('role', data.data.role, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      setUser(data.data);
      setIsLogin(true);
    }
    return data;
  } catch (error) {
    throw new Error(error?.message);
  }
};
