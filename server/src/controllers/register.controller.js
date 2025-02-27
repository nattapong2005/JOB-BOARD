const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, lastname, email, password, phone } = req.body;
  const role = "";

  if(!name || !lastname || !email || !password || !phone) return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });

  const hasUser = await prisma.users.findUnique({ where: { email } });
  if (hasUser) {
    return res.status(400).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const users = await prisma.users.create({
      data: {
        name,
        lastname,
        email,
        password: hashPassword,
        phone,
        img: "",
        role,
      },
    });

    if (!users) {
      return res.status(400).json({ message: "ไม่สามารถสมัครสมาชิกได้" });
    }

    return res.status(201).json({ success: "ลงทะเบียนเรียบร้อย", userID: users.id });

  } catch (error) {
    res.status(500).json({ error: "เกิดผิดพลาดในการสมัคร" });
  }
};
