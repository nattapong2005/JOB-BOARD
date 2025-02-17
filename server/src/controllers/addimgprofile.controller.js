const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add = async (req,res) => {

    try {

        const {id} = req.params;
        const img = req.file ? req.file.filename : null; 

        if (isNaN(id)) {
            return res.status(400).json({ message: "ไอดีไม่ถูกต้อง" });
          }

        if(!img) {
            return res.status(400).json({message: "กรุณาเพิ่มรูป"})
        }
        
        const addImg = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                img,
            }
        })
        
        if(!addImg) {
            return res.status(400).json({message: "เกิดข้อผิดพลาดในการเพิ่มรูป"})
        }
        return res.status(200).json({message: "เพิ่มรูปโปรไฟล์ที่ไอดี " + id})

    } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }

}