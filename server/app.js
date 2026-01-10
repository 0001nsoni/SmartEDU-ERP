import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import institutionRoutes from "./src/routes/institution.routes.js";
import studentRoutes from "./src/routes/student.routes.js";
import facultyRoutes from "./src/routes/faculty.routes.js";
import hostelRoutes from "./src/routes/hostel.routes.js";
import hostelLeaveRoutes from "./src/routes/hostelLeave.routes.js";
import noticeRoutes from "./src/routes/notice.routes.js";
import clubRoutes from "./src/routes/club.routes.js";
import transportRoutes from "./src/routes/transport.routes.js";
import timetableRoutes from "./src/routes/timetable.routes.js";
import attendanceRoutes from "./src/routes/attendance.routes.js";
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/hostel-leaves", hostelLeaveRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
// SOCKET EVENTS
import Bus from "./src/models/Bus.js";

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // DRIVER SENDS LOCATION
  socket.on("bus:location", async ({ busId, lat, lng }) => {
    await Bus.findByIdAndUpdate(busId, {
      currentLocation: { lat, lng, updatedAt: new Date() }
    });

    // broadcast to everyone watching this bus
    io.emit(`bus:${busId}:location`, { lat, lng });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
