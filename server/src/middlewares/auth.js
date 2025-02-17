const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
    
        if (!token) {
        return res.status(401).json({ message: "ไม่มี Token" });
        }
    
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decode.userID;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }
}