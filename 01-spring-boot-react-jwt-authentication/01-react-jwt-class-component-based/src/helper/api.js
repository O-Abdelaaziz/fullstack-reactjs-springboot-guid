import axios from "axios";

const API_URL = "http://localhost:8080/api/authentication/";

const AxiosApi = axios.create({
    baseURL: API_URL,
});

export default AxiosApi;