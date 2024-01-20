
import {baseUrl} from "$env/static/private"
import axios from "axios"

export const client = axios.create({
  baseURL: baseUrl,
});
  