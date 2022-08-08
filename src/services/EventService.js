import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/poiuy933/JSON4MockDB",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  //   getEvents() {
  //     return apiClient.get("/events");
  //   },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
  getEvents(page = 0, perPage = 0) {
    if (perPage === 0 || page === 0) return apiClient.get("/events");
    else return apiClient.get(`/events?_page=${page}&_limit=${perPage}`);
  },
};
