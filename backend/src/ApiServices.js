import axios from 'axios';

const mainUrl = process.env.NODE_ENV === "development"? "http://localhost:5000" : "";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);
        if (error.response.status === 402 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              const response =  axios.post(`${mainUrl}/admin/refreshToken`, { refreshToken });
              const { token } = response.data.info;
      
              localStorage.setItem('token', token);
      
              // Retry the original request with the new token
            //   originalRequest.headers.Authorization = `Bearer ${token}`;
            //   return axios(originalRequest);
            } catch (error) {
              // Handle refresh token error or redirect to login
            }
          }


        if(error.response.status === 405){
            localStorage.removeItem("token");
            window.location.reload();
        }
        
        return Promise.reject(error);
    }
)

export const adminLogin = (data) => axios.post(`${mainUrl}/admin/login`, data);
