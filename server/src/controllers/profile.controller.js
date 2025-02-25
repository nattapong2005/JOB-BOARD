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
        company: true,
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
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const {id} = req.params;
    const company = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        img: true,
      },
    });
    if (!company) {
      return res.status(400).json({ message: "ไม่พบข้อมูลบริษัท" });
    }
    return res.status(200).json({ company });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userID = req.user.userID;
    const img = req.file ? req.file.filename : null;
    const { name, lastname, email, password, phone } = req.body;

    if (!name && !lastname && !phone && !img && !email) {
      return res
        .status(400)
        .json({ message: "กรุณาส่งข้อมูลที่ต้องการอัปเดต" });
    }

    let updateData = {};
    if (name) updateData.name = name;
    if (lastname) updateData.lastname = lastname;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (img) updateData.img = img;

    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updateProfile = await prisma.users.update({
      where: { id: userID }, 
      data: updateData,
    });

    if (!updateProfile) {
      return res.status(400).json({ message: "ไม่สามารถอัปเดตข้อมูลได้" });
    }
    return res.status(200).json({ message: "อัปเดตข้อมูลสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};



