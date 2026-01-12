import { useEffect, useState } from "react";
import api from "../../services/api";
import { createStudent } from "../../services/adminApi";

export default function CreateStudent({ onCreated }) {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [buses, setBuses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "123456",
    enrollmentNo: "",
    rollNo: "",
    studentType: "DAY_SCHOLAR",
    courseId: "",
    year: "",
    section: "",
    hostelId: "",
    roomNumber: "",
    busId: ""
  });

  /* =========================
     LOAD INITIAL DATA
  ========================= */
  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data.courses || []));
    api.get("/hostels").then(res => setHostels(res.data.hostels || []));
    api.get("/transport/buses").then(res => setBuses(res.data.buses || []));
  }, []);

  /* =========================
     LOAD SECTIONS
  ========================= */
  useEffect(() => {
    if (form.courseId && form.year) {
      api
        .get(`/sections?courseId=${form.courseId}&year=${form.year}`)
        .then(res => setSections(res.data.sections || []));
    }
  }, [form.courseId, form.year]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    const {
      name, email, enrollmentNo, rollNo,
      studentType, courseId, year, section
    } = form;

    if (
      !name || !email || !enrollmentNo ||
      !rollNo || !studentType ||
      !courseId || !year || !section
    ) {
      return alert("Please fill all required fields");
    }

    await createStudent(form);
    alert("Student created successfully");
    onCreated();
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Create Student</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* BASIC INFO */}
        <input name="name" placeholder="Student Name"
          className="border p-2 rounded" onChange={handleChange} />

        <input name="email" placeholder="Email"
          className="border p-2 rounded" onChange={handleChange} />

        <input name="rollNo" placeholder="Roll No"
          className="border p-2 rounded" onChange={handleChange} />

        <input name="enrollmentNo" placeholder="Enrollment No"
          className="border p-2 rounded" onChange={handleChange} />

        {/* COURSE */}
        <select name="courseId" className="border p-2 rounded"
          onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        {/* YEAR */}
        <select name="year" className="border p-2 rounded"
          onChange={handleChange}>
          <option value="">Select Year</option>
          {[1, 2, 3, 4].map(y => (
            <option key={y} value={y}>Year {y}</option>
          ))}
        </select>

        {/* SECTION */}
        <select name="section" className="border p-2 rounded"
          onChange={handleChange}>
          <option value="">Select Section</option>
          {sections.map(s => (
            <option key={s._id} value={s.section}>{s.section}</option>
          ))}
        </select>

        {/* STUDENT TYPE */}
        <select name="studentType" className="border p-2 rounded"
          onChange={handleChange}>
          <option value="DAY_SCHOLAR">Day Scholar</option>
          <option value="HOSTELLER">Hosteller</option>
          <option value="BUS_SERVICE">Bus Service</option>
        </select>

        {/* HOSTELLER FIELDS */}
        {form.studentType === "HOSTELLER" && (
          <>
            <select name="hostelId" className="border p-2 rounded"
              onChange={handleChange}>
              <option value="">Select Hostel</option>
              {hostels.map(h => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>

            <input name="roomNumber" placeholder="Room Number"
              className="border p-2 rounded" onChange={handleChange} />
          </>
        )}

        {/* BUS FIELDS */}
        {form.studentType === "BUS_SERVICE" && (
          <select name="busId" className="border p-2 rounded"
            onChange={handleChange}>
            <option value="">Select Bus</option>
            {buses.map(b => (
              <option key={b._id} value={b._id}>{b.busNumber}</option>
            ))}
          </select>
        )}

      </div>

      <button
        onClick={submit}
        className="mt-6 px-6 py-2 bg-black text-white rounded-lg"
      >
        Create Student
      </button>
    </div>
  );
}
