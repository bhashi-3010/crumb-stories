import axios from "axios";

const API = axios.create({
    baseURL: "https://crumb-stories-2.onrender.com/api",
});

export default API;