import Institution from "../models/Institution.js";

/**
 * CREATE INSTITUTION (SUPER ADMIN)
 */
export const createInstitution = async (req, res) => {
  try {
    const { name, code, address } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }

    const exists = await Institution.findOne({ code });
    if (exists) {
      return res.status(400).json({ message: "Institution code already exists" });
    }

    const institution = await Institution.create({
      name,
      code,
      address
    });

    res.status(201).json({
      message: "Institution created successfully",
      institution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
