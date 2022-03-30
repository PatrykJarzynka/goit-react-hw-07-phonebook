import axios from 'axios'

const baseURL = 'https://624456ff3da3ac772b0e8aee.mockapi.io/';

const api = axios.create({
    baseURL
})

export default api;