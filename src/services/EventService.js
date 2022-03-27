import axios from 'axios'

// a single Axios instance for our entire app
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // through error if API call takes longer than 10 seconds
  timeout: 10000,
})

// export getEvents function. that returns events
export default {
  // providing 'perPage' events number, and 'page' number
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    // add new event obj to json file
    return apiClient.post('/events', event)
  },
}
