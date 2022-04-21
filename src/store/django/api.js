import { publicRequest } from "../../network/https";
import { urls } from "./constants";

const api = {
  applyBlur: payload =>
    publicRequest({ method: "post", route: urls.blur, payload: payload, responseType: "arraybuffer" })
};

export default api;
