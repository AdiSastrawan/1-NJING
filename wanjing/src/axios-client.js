import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
        }

        throw error;
    }
);
