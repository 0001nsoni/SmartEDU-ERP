import Institution from "../models/Institution.js";

/**
 * CREATE INSTITUTION (SUPER ADMIN)
 */
export const createInstitution = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required",
      });
    }

    const existing = await Institution.findOne({ code });
    if (existing) {
      return res.status(400).json({
        message: "Institution code already exists",
      });
    }

    const institution = await Institution.create({
      name,
      code,
      status: "ACTIVE",
    });

    res.status(201).json({
      message: "Institution created successfully",
      institution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL INSTITUTIONS (SUPER ADMIN)
 */
export const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().sort({
      createdAt: -1,
    });

    res.json({
      institutions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE INSTITUTION STATUS (SUPER ADMIN)
 */
export const updateInstitutionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const institution = await Institution.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!institution) {
      return res.status(404).json({
        message: "Institution not found",
      });
    }

    res.json({
      message: "Institution status updated",
      institution,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
