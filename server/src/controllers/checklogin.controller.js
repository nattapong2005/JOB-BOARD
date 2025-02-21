const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.check = async (req, res) => {

    try {

        const userID = req.userID;
        const user = await prisma.users.findUnique({
            where: {id: userID},
        });
    
        if (!user) {
            return res.status(400).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" });
        }

        return res.status(200).json({ message: "Token is working" });

    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }

};