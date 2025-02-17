const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  GET all posts
exports.get = async (req, res) => {
  try {
    const getJobPost = await prisma.jobpost.findMany({});

    if (!getJobPost || getJobPost == "") {
      return res.status(400).json({ error: "ไม่พบโพสต์งาน" });
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

    const getJobPostById = await prisma.jobpost.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!getJobPostById) {
      return res.status(400).json({ error: "ไม่พบไอดี " + id });
    }

    return res.status(200).json(getJobPostById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// POST create a post
exports.create = async (req, res) => {
  try {
    const {
      userID,
      description,
      requirement,
      salary,
      location,
      jobtypeID,
      status,
    } = req.body;
    console.log(req.body);
    const createJobPost = await prisma.jobpost.create({
      data: {
        userID,
        description,
        requirement,
        salary,
        location,
        jobtypeID,
        status,
      },
    });

    if (!createJobPost) {
      return res.status(400).json({ error: "ไม่สามารถสร้างโพสต์ได้" });
    }

    return res.status(200).json({ success: "สร้างโพสต์งานสำเร็จ" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// PUT update by Id
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const {
      userID,
      description,
      requirement,
      salary,
      location,
      jobtypeID,
      status,
    } = req.body;
    const updateJobPost = await prisma.jobpost.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userID,
        description,
        requirement,
        salary,
        location,
        jobtypeID,
        status,
      },
    });

    if (!updateJobPost) {
      return res.status(400).json({ error: "ไม่สามารถอัพเดทไอดี " + id });
    }

    return res.status(200).json({ success: "อัพทเดทโพสต์ไอดี " + id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// DELETE post by Id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ไอดีไม่ถูกต้อง" });
    }

    const deleteJobPost = await prisma.jobpost.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deleteJobPost) {
      return res.status(400).json({ error: "ไม่สามารถลบไอดี " + id });
    }

    return res.status(200).json({ success: "ลบโพสต์ไอดี " + id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
