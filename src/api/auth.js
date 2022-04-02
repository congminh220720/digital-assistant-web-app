import axiosClient from "./axiosClient";

const authApi = {
  createAccount: (data) => {
    const url = "/create-user";
    return axiosClient.post(url, data);
  },
};

export default authApi;
