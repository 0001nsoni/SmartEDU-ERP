import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    /* ==========================
       AUTH & OWNERSHIP
    ========================== */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },

    /* ==========================
       ACADEMIC IDENTITY
    ========================== */
    enrollmentNo: {
      type: String,
      required: true,
      unique: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    rollNo: {
      type: String,
      required: true
    },

    /* ==========================
       STUDENT CATEGORY
    ========================== */
    studentType: {
      type: String,
      enum: ["HOSTELLER", "DAY_SCHOLAR", "BUS_SERVICE"],
      required: true
    },

    /* ==========================
       HOSTEL DETAILS
    ========================== */
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      default: null
    },

    roomNumber: {
      type: String,
      default: null
    },

    /* ==========================
       TRANSPORT DETAILS
    ========================== */
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      default: null
    },

    /* ==========================
       CLUBS & ACTIVITIES
    ========================== */
    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
      }
    ],

    /* ==========================
       STATUS & LIFECYCLE
    ========================== */
    isActive: {
      type: Boolean,
      default: true
    },

    admissionDate: {
      type: Date,
      default: Date.now
    },

    exitDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

/* ==========================
   INDEXES (IMPORTANT)
========================== */
studentSchema.index({
  institutionId: 1,
  courseId: 1,
  year: 1,
  section: 1
});

export default mongoose.model("Student", studentSchema);
