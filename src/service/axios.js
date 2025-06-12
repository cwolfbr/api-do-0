import axios from 'axios'

const apiPloomes = axios.create({
    baseURL: 'https://api2.ploomes.com',
});
export default apiPloomes;