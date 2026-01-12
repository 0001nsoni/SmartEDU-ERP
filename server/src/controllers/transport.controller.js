import Route from "../models/Route.js";
import Bus from "../models/Bus.js";
import Driver from "../models/Driver.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


/**
 * GET ALL ROUTES (ADMIN)
 */
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({
      institutionId: req.user.institutionId
    }).sort({ createdAt: -1 });

    res.json({ routes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN → CREATE ROUTE
 */
export const createRoute = async (req, res) => {
  try {
    const { routeName, stops } = req.body;

    if (!routeName || !Array.isArray(stops) || stops.length < 2) {
      return res.status(400).json({
        message: "Route name and at least 2 stops required"
      });
    }

    // 🔑 ADD ORDER HERE
    const formattedStops = stops.map((stop, index) => ({
      name: stop.name,
      lat: stop.lat,
      lng: stop.lng,
      order: index + 1
    }));

    const route = await Route.create({
      institutionId: req.user.institutionId,
      routeName,
      stops: formattedStops
    });

    res.status(201).json({
      message: "Route created successfully",
      route
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * ADMIN → CREATE BUS
 */
export const createBus = async (req, res) => {
  const { busNumber, routeId, capacity } = req.body;

  const bus = await Bus.create({
    institutionId: req.user.institutionId,
    busNumber,
    routeId,
    capacity
  });

  res.status(201).json({ busId: bus._id });
};

/**
 * ADMIN → CREATE DRIVER
 */
export const createDriver = async (req, res) => {
  const { name, email, password, licenseNumber } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "DRIVER",
    institutionId: req.user.institutionId
  });

  const driver = await Driver.create({
    userId: user._id,
    institutionId: req.user.institutionId,
    licenseNumber
  });

  res.status(201).json({ driverId: driver._id });
};

/**
 * STUDENT / FACULTY → VIEW BUS ROUTE BY BUS NUMBER
 */
export const getBusByNumber = async (req, res) => {
  const { busNumber } = req.params;

  const bus = await Bus.findOne({
    busNumber,
    institutionId: req.user.institutionId
  })
    .populate("routeId")
    .populate("driverId");

  if (!bus) {
    return res.status(404).json({ message: "Bus not found" });
  }

  res.json({ bus });
};
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find({
      institutionId: req.user.institutionId
    })
      .populate("routeId", "routeName stops")
      .sort({ createdAt: -1 });

    res.json({
      buses
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};