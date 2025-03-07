const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "ผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "ผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง" });
    }

    if(!user.role) {
      return res.status(200).json({ message: "verify", userID: user.id });
    }
    
    const payload = {
      userID: user.id,
      role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h",});

    return res.status(200).json({ payload,token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
