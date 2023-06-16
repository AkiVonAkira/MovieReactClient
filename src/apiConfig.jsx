import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7207",
});

export default instance;
