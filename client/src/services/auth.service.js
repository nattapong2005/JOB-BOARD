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

const updateRole = async (userID,role) => {
  try {
    const res = await http.put(`/users/${userID}/role`, {role}, {
    });
    return res;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const AuthService = {
  login,
  register,
  updateRole,
};

export default AuthService;
