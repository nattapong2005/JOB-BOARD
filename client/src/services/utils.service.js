import http from "../http-common";

const jobtype = async () => {
  try {
    const res = await http.get("/jobtype");
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const getJobPost = async () => {
  try {
    const res = await http.get("/jobpost");
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const getJobDetail = async (id) => {
  try {
    const res = await http.get(`/jobpost/${id}`);
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};


const jobpost = async (token, data) => {
  try {
    const res = await http.post("/jobpost", data,{
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};


const profile = async (token) => {
  try {
    const res = await http.get("/profile", {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const updateProfile = async (token,data) => {
  try {
    const res = await http.put("/profile/update", data, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      },
    });
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const companyProfile = async (id) => {
  try {
    const res = await http.get(`/profile/company/${id}`, {
    });
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const getUsers = async () => {
  try {
    const res = await http.get('/users');
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};


const UtilsService = {
  jobtype,
  profile,
  companyProfile,
  updateProfile,
  jobtype,
  jobpost,
  getJobPost,
  getJobDetail,
  getUsers
};

export default UtilsService;
