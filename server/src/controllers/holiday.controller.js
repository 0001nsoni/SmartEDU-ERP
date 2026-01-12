import Holiday from "../models/Holiday.js";

/**
 * CREATE HOLIDAY (ADMIN)
 */
export const createHoliday = async (req, res) => {
  try {
    const { title, date, type } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        message: "Title and date are required"
      });
    }

    const exists = await Holiday.findOne({
      institutionId: req.user.institutionId,
      date: new Date(date)
    });

    if (exists) {
      return res.status(400).json({
        message: "Holiday already exists for this date"
      });
    }

    const holiday = await Holiday.create({
      institutionId: req.user.institutionId,
      title,
      date,
      type
    });

    res.status(201).json({
      message: "Holiday created successfully",
      holiday
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET HOLIDAYS (ALL ROLES)
 */
export const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find({
      institutionId: req.user.institutionId
    }).sort({ date: 1 });

    res.json({ holidays });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};