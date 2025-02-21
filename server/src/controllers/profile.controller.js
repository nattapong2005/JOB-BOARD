const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserProfile = async (req, res) => {

    try {
        
    const userID = req.user.userID;
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(userID),
        },
        select: {
            id: true,
            email: true,
            name: true,
            lastname: true,
            phone: true,
            role: true,
        },
    });
    if (!user) {
        return res.status(400).json({ message: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }
}