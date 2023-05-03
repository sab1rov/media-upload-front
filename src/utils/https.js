import axios from "axios";
import { mediaBaseURL } from "./url";
import { AES } from "crypto-js";

export const handleEncrypted = () =>
  AES.encrypt(
    JSON.stringify({
      client: "finlite",
      secret: "gCosGwTqCNCpIoGnS28V7TfD2V0obDbPaJSY6LvmN7Lg0XPl5Rt6ne9vdbwL+Q",
      time: Date.now(),
    }),
    "G2DPdL0RN2ldSRuKpnWSRlfZrzBBEtc0qhZ+xQaRjjdTZdV89bausl1KR6l1SkqY"
  ).toString();

const encrypted = handleEncrypted();

export const $mediaApi = axios.create({
  baseURL: mediaBaseURL,
  headers: {
    "x-auth-key": encrypted,
  },
});
