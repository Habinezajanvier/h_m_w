import axios from "axios"

export const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_ENDPOINT : process.env.REACT_APP_DEVELOPMENT_ENDPOINT
export function init() {
  axios.defaults.baseURL = baseURL
}
export const setAuthToken = async token => {
  if (token) {
    axios.defaults.headers["SECRET-API-KEY"] = token
    localStorage.setItem("token", token)
  } else {
    delete axios.defaults.headers["SECRET-API-KEY"]
    localStorage.clear()
  }
}
