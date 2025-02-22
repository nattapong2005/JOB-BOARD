const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
    try {

        const token = req.header("Authorization");
        if (!token) {
        return res.status(401).json({ message: "ไม่พบ Token" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token หมดอายุ" });
        }else {
            console.log(error);
            return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
        } 
    }
}

module.exports = authMiddleware;