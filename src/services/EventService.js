import axios from 'axios'

// a single Axios instance for our entire app
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
})
// export getEvents function. that returns events
export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    // add new event obj to json file
    return apiClient.post('/events', event)
  },
}
