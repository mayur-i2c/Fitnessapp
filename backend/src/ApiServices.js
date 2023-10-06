import axios from 'axios';

const mainUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5055' : '';

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 402 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${mainUrl}/admin/refreshToken`, { refreshToken });
        const token = response.data.info;
        // console.log(response.data.info);
        localStorage.setItem('token', token);
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        // console.log(originalRequest);
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    if (error.response.status === 405) {
      localStorage.removeItem('token');
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const adminLogin = (data) => axios.post(`${mainUrl}/admin/login`, data);

export const checkmailid = (data) => axios.post(`${mainUrl}/admin/checkmailid`, data);

export const resetPassword = (data) => axios.post(`${mainUrl}/admin/resetPassword`, data);

// Get admin details
export const adminDetails = () =>
  axios.get(`${mainUrl}/admin/adminDetails`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

// Get admin profile
export const changePassword = (data) =>
  axios.post(`${mainUrl}/admin/changePassword`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Change Password
export const UpdateProfile = (data) =>
  axios.post(`${mainUrl}/admin/UpdateProfile`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Get All users
export const allUsers = (data) =>
  axios.get(`${mainUrl}/admin/user/allUsers`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Single User
export const deleteUser = (data) =>
  axios.get(`${mainUrl}/admin/user/deleteUser`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
