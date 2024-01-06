import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosPrivate;