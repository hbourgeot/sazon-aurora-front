
// import {baseUrl} from "$env/static/private"
import axios from "axios"
import {debugResponse, debugRequest} from "$lib/utils/debugger"

const client = axios.create({
  baseURL: '',
});

client.interceptors.response.use(
  (response) => {
    debugResponse(response);
    return response;
  },
  (error) => {
    debugResponse(error.response, error);
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  (config) => {
    debugRequest(config);
    return config;
  },
  (error) => {
    debugRequest(error.config);
    return Promise.reject(error);
  }
)

export {client}
  