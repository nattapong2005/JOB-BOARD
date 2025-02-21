import http from "../http-common";


const hotwork = async () => {

  try {
    const res = await http.get("/jobtype");
    return res;
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const profile = async (token) => {

  try {

    const res = await http.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res;
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};


const UtilsService = {
  hotwork,
  profile,
};

export default UtilsService;
