import {Platform} from "react-native";
import axios from "axios";
import {API_URL as PROD_URL, STAGE, API_URL_ANDORID, API_URL_IOS} from "@env";

export const API_URL =
  STAGE === "prod"
    ? PROD_URL
    : Platform.OS === "ios"
    ? API_URL_IOS
    : API_URL_ANDORID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//TODO: Interceptors

export {tesloApi};
