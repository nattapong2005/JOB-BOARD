import http from "../http-common";


const hotwork = async () => {

  try {
    const res = await http.get("/jobtype");
    return res;
    
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const UtilsService = {
  hotwork,
};

export default UtilsService;
