import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.databaseURL,
});

export default axiosInstance;
