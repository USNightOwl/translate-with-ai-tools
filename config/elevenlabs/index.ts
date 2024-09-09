import axios from "axios";
import { setupInterceptors } from "./interceptor";

const AxiosClient = axios.create({
  baseURL: "https://api.elevenlabs.io/v1/text-to-speech",
  headers: {
    Accept: "application/json",
  },
});

setupInterceptors(AxiosClient);

export default AxiosClient;