import axios from "axios";

const baseURLs = {
  development: "http://localhost:7000/",
  production: "https://job-posting-board-84yv.onrender.com",
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? baseURLs.production
    : baseURLs.development;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
