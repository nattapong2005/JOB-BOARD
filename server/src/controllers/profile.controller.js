const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

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
            img: true,
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


exports.updateProfile = async (req, res) => {

    try {
       
        const userID = req.user.userID;
        const {name, lastname, email, password, phone, img } = req.body;

        if ( !name && !lastname && !phone && !img && !email && !password) {
            return res.status(400).json({ message: "กรุณาส่งข้อมูลที่ต้องการอัปเดต" });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const updateProfile = await prisma.users.update({
            where: {
              id: parseInt(userID),
            },
            data: {
              name,
              lastname,
              email,
              password: hashedPassword,
              phone,
              img,
            },
          });
          if(!updateProfile) {
            return res.status(400).json({ message: "ไม่สามารถอัปเดตข้อมูลได้" });
          }
          return res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
    }

}