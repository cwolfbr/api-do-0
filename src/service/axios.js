import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiPloomes = axios.create({
    baseURL: process.env.PLOOMES_BASE_URL || 'https://api2.ploomes.com',
});

export default apiPloomes;