import axios from 'axios';

const mainUrl = process.env.NODE_ENV === "development"? "http://localhost:5000" : "";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.status === 405){
            localStorage.removeItem("token");
            window.location.reload();
        }
        return Promise.reject(error);
    }
)

export const adminLogin = (data) => axios.post(`${mainUrl}/admin/login`, data);
