import axios from "axios";

let url = "";
if (process.env.NODE_ENV === 'production') {
  url="https://35.78.70.184/api"
}

if (process.env.NODE_ENV === 'development') {
  url="http://localhost:3005/api"
}

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});
