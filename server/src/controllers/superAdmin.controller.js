import User from "../models/User.js";
import Institution from "../models/Institution.js";
import bcrypt from "bcryptjs";

export const createInstitutionAdmin = async (req, res) => {
  try {
    const { name, email, password, institutionId } = req.body;

    if (!name || !email || !password || !institutionId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      institutionId
    });

    res.status(201).json({
      message: "Institution admin created",
      admin
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
