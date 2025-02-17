const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all jobtype
exports.get = async (req, res) => {
  try {
    const getJobType = await prisma.jobtype.findMany({});

    if (!getJobType || getJobType == "") {
      return res.status(400).json({ error: "ไม่พบประเภทงาน" });
    }

    return res.status(200).json(getJobType);
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

    const getJobTypeById = await prisma.jobtype.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!getJobTypeById) {
      return res.status(400).send("ไม่พบประเภทงานไอดี " + id);
    }

    return res.status(200).json(getJobTypeById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// POST
exports.create = async (req, res) => {
  try {
    const { name, type } = req.body;
    const createJobType = await prisma.jobtype.create({
      data: {
        name,
        type,
      },
    });

    if (!createJobType) {
      return res.status(400).json({ success: "ไม่สามารถสร้างประเภทงาน" });
    }

    return res.status(200).json({ success: "สร้างประเภทงานสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// PUT job type by Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const { name } = req.body;
    const updateJobType = await prisma.jobtype.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    if (!updateJobType) {
      return res.status(400).json({ error: "เกิดข้อผิดพลาดไอดี " + id });
    }

    return res.status(200).json({ success: "อัพทเดทประเภทไอดี " + id });
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

    const jobtype = await prisma.jobtype.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!jobtype) {
      return res.status(400).json({ error: "เกิดข้อผิดพลาดไอดี " + id });
    }

    return res.status(200).json({ success: "ลบประเภทงานไอดี " + id });
  } catch (error) {
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
