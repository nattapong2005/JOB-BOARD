const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all users
exports.get = async (req, res) => {
  try {
    const getAllUserType = await prisma.usertype.findMany({});

    return res.status(200).json(getAllUserType);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

//  GET by Id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const getUserTypeById = await prisma.usertype.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!getUserTypeById) {
      return res.status(400).json({ error: "ไม่พบประเภทผู้ใช้ไอดี " + id });
    }

    return res.status(200).json(getUserTypeById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// POST
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const createUserType = await prisma.usertype.create({
      data: {
        name,
      },
    });

    if (!createUserType) {
      return res.status(400).json({ error: "สร้างประเภทผู้ใช้งานไม่สำเร็จ" });
    }

    return res.status(200).json({ success: "สร้างประเภทผู้ใช้งานสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// PUT
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const { name } = req.body;
    const updateUserType = await prisma.usertype.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    if (!updateUserType) {
      return res
        .status(400)
        .json({ error: "ไม่สามารถอัพเดทประเภทผู้ใช้งานไอดี " + id });
    }

    return res.status(200).json({ success: "อัพเดทประเภทผู้ใช้งานไอดี " + id });
  } catch (error) {
    console.log(error);
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

    const deleteUserType = await prisma.usertype.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deleteUserType) {
      return res.status(400).json({ error: "เกิดข้อผิดพลาดไอดี " + id });
    }

    return res.status(200).json({ success: "ลบประเภทผู้ใช้งานไอดี " + id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
