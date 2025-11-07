import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🧱 REGISTRO DE ADMIN (solo una vez)
router.post("/register-admin", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Ya existe ese correo" });

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await User.create({ name, email, passwordHash, role: "admin" });
  res.json({ msg: "Admin creado", admin });
});

// 🔐 LOGIN DE ADMIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Solo los administradores pueden entrar" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "2h"
  });

  res.json({ msg: "Login exitoso", token, user: { name: user.name, email: user.email } });
});

export default router;
