import axios from 'axios';
import settings from '../settings/settings';

// Create the API route instance by Axios.
const api = axios.create({
    baseURL: settings.api_base_url
});

export default api;