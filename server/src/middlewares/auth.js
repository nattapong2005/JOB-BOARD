const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
    try {

        const token = req.header("Authorization").split(" ")[1];
    
        if (!token) {
        return res.status(401).json({ message: "ไม่มี Token" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token หมดอายุ" });
        }else {
            return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
        } 
    }
}

module.exports = authMiddleware;