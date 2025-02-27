const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
  try {
    const application = await prisma.application.findMany({
      include: {
        user: true,
        jobpost: true,
      },
    });

    if (!application || application == "") {
      return res.status(400).json({ error: "ไม่พบการสมัคร" });
    }
    return res.status(200).json(application);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        jobpost: true,
      },
    });

    if (!application) {
      return res.status(400).json({ error: "ไม่พบไอดี " + id });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { userID } = req.params;

    if (isNaN(userID)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const application = await prisma.application.findMany({
      where: {
        userID: parseInt(userID),
      },
      include: {
        user: true,
        jobpost: true,
      },
    });

    if (!application) {
      return res.status(400).json({ error: "ไม่พบการสมัครผู้ใช้ไอดี " + userID });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};


exports.apply = async (req, res) => {
  try {
    const { userID, jobpostID } = req.body;
    const portfolio = req.file ? req.file.filename : null;
    const checkApply = await prisma.application.findFirst({
      where: {
        AND: [
          { jobpostID: parseInt(jobpostID) },
          { userID: parseInt(userID) }
        ]
      }
    });

    if (checkApply) {
      return res.status(400).json({ error: "คุณได้ทำการสมัครงานบริษัทนี้แล้ว" });
    }

    if (!userID || !jobpostID ) {
      return res.status(400).json({ error: "กรอกข้อมูลให้ครบถ้วน" });
    }
    const application = await prisma.application.create({
      data: {
        userID: parseInt(userID),
        jobpostID: parseInt(jobpostID),
        portfolio,
      },
    });

    if (!application) { 
      return res.status(400).json({ error: "ไม่สามารถสมัครงานได้" });
    }
    return res.status(200).json({ success: "สมัครงานสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const { userID, jobpostID, portfolio, application_at, status } = req.body;
    const updateApply = await prisma.application.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userID,
        jobpostID,
        portfolio,
        application_at,
        status,
      },
    });

    if (!updateApply) {
      return res.status(400).json({ error: "ไม่สามารถอัพเดทไอดี " + id });
    }

    return res.status(200).json({ success: "อัพเดทการสมัครงานไอดี " + id });
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

    const findId = await prisma.application.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!findId) {
      return res.status(400).json({ error: "ไม่พบไอดีของการสมัคร" });
    }

    const deleteApply = await prisma.application.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deleteApply) {
      return res.status(400).json({ error: "ไม่สามารถลบไอดี " + id });
    }
    return res.status(200).json({ success: "ลบการสมัครไอดี " + id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
