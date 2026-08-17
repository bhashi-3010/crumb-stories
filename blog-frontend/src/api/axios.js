import axios from "axios";

const API = axios.create({
  baseURL: "https://crumb-stories.onrender.com/api",
});

export default API;