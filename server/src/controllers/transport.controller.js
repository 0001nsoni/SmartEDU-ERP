import Route from "../models/Route.js";
import Bus from "../models/Bus.js";
import Driver from "../models/Driver.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * ADMIN → CREATE ROUTE
 */
export const createRoute = async (req, res) => {
  const { routeName, stops } = req.body;

  const route = await Route.create({
    institutionId: req.user.institutionId,
    routeName,
    stops
  });

  res.status(201).json({ routeId: route._id });
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
