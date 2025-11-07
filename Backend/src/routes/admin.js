import express from "express";
import Document from "../models/Document.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Solo admins pueden acceder
router.get("/documents", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado" });
  }

  const docs = await Document.find()
    .populate("template", "name")
    .populate("filledBy", "email")
    .sort({ createdAt: -1 });

  res.json(docs);
});

export default router;
