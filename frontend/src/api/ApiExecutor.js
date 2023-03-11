import axios from "axios";

import * as apiActions from "./ApiActions";
import { BASE_URL } from "../constants/constants"; 

export const instancee = () => axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("user_token")
      ? `Bearer ${localStorage.getItem("user_token")}`
      : null,
  },
});

// eslint-disable-next-line
const applyInterceptor = (instance) => 
 instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    // specific error should handled by caller
    return Promise.reject(error);
  }
);

export default async function ApiExecutor(action, url, data = {}) {
  let response = {};
  let instance = instancee();
  // applyInterceptor(instance)
  switch (action) {
    case apiActions.GET:
      response = await instance.get(url);
      return response;
    case apiActions.POST:
      response = await instance.post(url, data);
      return response;
    case apiActions.PUT:
      response = await instance.put(url, data);
      return response;
    case apiActions.PATCH:
      response = await instance.patch(url, data);
      return response;
    case apiActions.DELETE:
      response = await instance.delete(url);
      return response;
    default:
      return response;
  }
}