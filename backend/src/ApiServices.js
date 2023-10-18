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

//Update Admin Profile
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
export const deleteUser = (id) =>
  axios.post(`${mainUrl}/admin/user/deleteUser/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

// delete multiple Users
export const deleteMultiUser = (data) => {
  return axios.delete(`${mainUrl}/admin/user/deleteMultiUser`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};

// Get Medical Conditions
export const getAllMedicalCon = () => {
  return axios.get(`${mainUrl}/admin/setting/getAllMedicalCon`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

// Get Active Medical Conditions
export const getActiveMedicalCon = () => {
  return axios.get(`${mainUrl}/admin/setting/getActiveMedicalCon`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

//Update User Status
export const updateUserStatus = (data, id) =>
  axios.put(`${mainUrl}/admin/user/updateUserStatus/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Single Medical Condition
export const deleteMedicalCon = (id) =>
  axios.delete(`${mainUrl}/admin/setting/deleteMedicalCon/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Multiple Medical Condition
export const deleteMultMedicalCon = (data) => {
  return axios.delete(`${mainUrl}/admin/setting/deleteMultMedicalCon`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};

//Update Medical Condition Status
export const updateMedicalConStatus = (data, id) =>
  axios.put(`${mainUrl}/admin/setting/updateMedicalConStatus/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add Medical Condition
export const addMedicalCon = (data) =>
  axios.post(`${mainUrl}/admin/setting/addMedicalCon`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Medical Status
export const updateMedicalCon = (data, id) =>
  axios.put(`${mainUrl}/admin/setting/updateMedicalCon/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update User Profile
export const updateUserProfile = (data, id) =>
  axios.put(`${mainUrl}/admin/user/updateUserProfile/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add User Profile
export const addUser = (data) =>
  axios.post(`${mainUrl}/admin/user/addUser`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Get All Essential
export const getAllEssentials = () =>
  axios.get(`${mainUrl}/admin/essential/getAllEssentials`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add Essential
export const addEssentials = (data) =>
  axios.post(`${mainUrl}/admin/essential/addEssentials`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential
export const updateEssentials = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssentials/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential Status
export const updateEssStatus = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssStatus/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Essential
export const deleteEssentials = (id) =>
  axios.delete(`${mainUrl}/admin/essential/deleteEssentials/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Multiple Essential
export const deleteMultEssentials = (data) => {
  return axios.delete(`${mainUrl}/admin/essential/deleteMultEssentials`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};

//Get All Essential Level 1 Sub-Category
export const getAllEssSubCat1 = (id) =>
  axios.get(`${mainUrl}/admin/essential/getAllEssSubCat1/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add Essential Level 1 Sub-Category
export const addEssSubCatLevel1 = (data, id) =>
  axios.post(`${mainUrl}/admin/essential/addEssSubCatLevel1/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential Level 1 Sub-Category
export const updateEssSubCat1 = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssSubCat1/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential Level 1 Sub-Category Status
export const updateEssSubCat1Status = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssSubCat1Status/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Essential Level 1 Sub-Category
export const deleteEssSubCat1 = (id) =>
  axios.delete(`${mainUrl}/admin/essential/deleteEssSubCat1/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Multiple Essential
export const deleteMultSubCat1 = (data) => {
  return axios.delete(`${mainUrl}/admin/essential/deleteMultSubCat1`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};

//Get All Essential Level 2 Sub-Category
export const getAllEssSubCat2 = (id) =>
  axios.get(`${mainUrl}/admin/essential/getAllEssSubCat2/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add Essential Level 2 Sub-Category
export const addEssSubCatLevel2 = (data, id) =>
  axios.post(`${mainUrl}/admin/essential/addEssSubCatLevel2/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential Level 2 Sub-Category
export const updateEssSubCat2 = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssSubCat2/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Essential Level 2 Sub-Category Status
export const updateEssSubCat2Status = (data, id) =>
  axios.put(`${mainUrl}/admin/essential/updateEssSubCat2Status/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Essential Level 2 Sub-Category
export const deleteEssSubCat2 = (id) =>
  axios.delete(`${mainUrl}/admin/essential/deleteEssSubCat2/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Multiple Essential Level 2 Sub-Category
export const deleteMultSubCat2 = (data) => {
  return axios.delete(`${mainUrl}/admin/essential/deleteMultSubCat2`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};

//Get All Reel
export const getAllReel = () =>
  axios.get(`${mainUrl}/admin/reel/getAllReel`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Add Reel
export const addReel = (data) =>
  axios.post(`${mainUrl}/admin/reel/addReel`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Reel
export const updateReel = (data, id) =>
  axios.put(`${mainUrl}/admin/reel/updateReel/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Update Reel Status
export const updateReelStatus = (data, id) =>
  axios.put(`${mainUrl}/admin/reel/updateReelStatus/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Reel
export const deleteReel = (id) =>
  axios.delete(`${mainUrl}/admin/reel/deleteReel/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

//Delete Multiple Reel
export const deleteMultReel = (data) => {
  return axios.delete(`${mainUrl}/admin/reel/deleteMultReel`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    data: { Ids: data }
  });
};
