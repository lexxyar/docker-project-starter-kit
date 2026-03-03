import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');

    // If the token exists, set the Authorization header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Ensure headers object exists before setting properties
    config.headers = config.headers ?? {};

    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
})

export const useHttp = () => {
    return {http: api}
}

