import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000' // Ensure this is correct
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
            console.log('Request intercepted', token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response ? error.response.status : null;
            console.log('Status error in interceptor', status);
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
