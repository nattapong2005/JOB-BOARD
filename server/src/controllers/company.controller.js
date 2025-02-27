const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const getJobPost = await prisma.company.findMany({
      include: {
        user: true,
      },
    });

    if (!getJobPost || getJobPost == "") {
      return res.status(400).json({ error: "ไม่พบบริษัท" });
    }

    return res.status(200).json(getJobPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// GET post by Id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const getCompanyById = await prisma.company.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        // jobpost: true
      },
    });

    if (!getCompanyById) {
      return res.status(400).json({ error: "ไม่พบไอดี " + id });
    }

    return res.status(200).json(getCompanyById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// POST create a post
exports.create = async (req, res) => {
  try {
    const { name, description, address, phone, userID } = req.body;

    if(!name && !description && !address && !phone && !userID){
      return res.status(400).json({ error: "กรุณาส่งข้อมูลที่ต้องการอัปเดต" });
    }

    const createCompany = await prisma.company.create({
      data: {
        userID: parseInt(userID),
        name,
        description,
        address,
        phone
      },
    });

    if (!createCompany) {
      return res.status(400).json({ error: "ไม่สามารถสร้างโพสต์ได้" });
    }
    return res.status(200).json({ success: "สร้างโพสต์งานสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const deleteCompany = await prisma.company.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deleteCompany) {
      return res.status(400).json({ error: "ไม่สามารถลบไอดี " + id });
    }

    return res.status(200).json({ success: "ลบบริษัทไอดี " + id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
