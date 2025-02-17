const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
exports.get = async (req, res) => {
  try {
    const getAllUser = await prisma.users.findMany({});

    if (!getAllUser) {
      return res.status(400).json({ error: "ไม่พบข้อมูลของผู้ใช้งาน" });
    }

    return res.status(200).json(getAllUser);
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// GET user by Id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const getUserById = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!getUserById) {
      return res.status(400).json({ error: "ไม่พบไอดี " + id });
    }

    return res.status(200).json(getUserById);
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// POST user
exports.create = async (req, res) => {
  try {
    const { id, name, lastname, email, password, phone, img, usertypeID } =
      req.body;
    const createUser = await prisma.users.create({
      data: {
        id,
        name,
        lastname,
        email,
        password,
        phone,
        img,
        usertypeID,
      },
    });

    if (!createUser) {
      return res.status(400).json({ error: "ไม่สามารถสร้างข้อมูลได้" });
    }

    return res.status(200).json({ success: "สร้างผู้ใช้งานสำเร็จ" });
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// PUT method by Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, phone, img, usertypeID } =
      req.body;
    const updateUser = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        lastname,
        email,
        password,
        phone,
        img,
        usertypeID,
      },
    });

    if (!updateUser) {
      return res.status(400).json({ error: "ไม่สามารถอัพเดทไอดี " + id });
    }

    return res.status(200).json({ success: "อัพเดทผู้ใช้งานไอดี " + id });
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// DELETE by Id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const deleteUser = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deleteUser) {
      return res.status(400).json({ error: "ไม่สามารถลบไอดี " + id });
    }

    return res.status(200).json({ success: "ลบผู้ใช้งานไอดี " + id });
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
