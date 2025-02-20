import http from "../http-common";

const login = async (data) => {

  try {

    const res = await http.post("/login", data);
    return res;

  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

const register = async (data) => {

  try {
    const res = await http.post("/register", data);
    return res;
    
  } catch (error) {
    console.error("Register Error:", error.message);
  }
};

const AuthService = {
  login,
  register,
};

export default AuthService;
