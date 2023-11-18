import axios from "axios";
import { FieldValues } from "react-hook-form";

const API = "http://localhost:4000/api";

export const registerRequest = (user: FieldValues) =>
  axios.post(`${API}/register`, user);
