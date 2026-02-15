import axios from "axios";

export const dictionaryClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DICTIONARY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
