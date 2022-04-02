import { USER_TOKEN } from "./contants";

export const setUserToken = (value) => {
  localStorage.setItem(USER_TOKEN, value);
};

export const getUserToken = () => {
  const value = localStorage.getItem(USER_TOKEN);
  try {
    if (value) return JSON.parse(value);
    return null;
  } catch (e) {
    return value;
  }
};

export const clearLocalStrorage = () => {
  localStorage.clear();
  window.location.assign("/Login");
};
