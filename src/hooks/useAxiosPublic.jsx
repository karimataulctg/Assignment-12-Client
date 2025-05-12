import axios, { Axios } from 'axios';


const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://product-hunt-server-two.vercel.app/'
    })
    return axiosPublic;
};

export default useAxiosPublic;