import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AssignMentor() {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);

  const [form, setForm] = useState({
    facultyId: "",
    courseId: "",
    year: "",
    semester: "",
    section: ""
  });

  /* ===========================
     INITIAL LOAD
  =========================== */
  useEffect(() => {
    api.get("/faculty").then(res =>
      setFaculty(res.data.faculty || [])
    );

    api.get("/courses").then(res =>
      setCourses(res.data.courses || [])
    );
  }, []);

  /* ===========================
     LOAD SECTIONS WHEN COURSE/YEAR CHANGES
  =========================== */
  useEffect(() => {
    if (form.courseId && form.year) {
      api
        .get(
          `/sections?courseId=${form.courseId}&year=${form.year}`
        )
        .then(res => {
          setSections(res.data.sections || []);
        });
    } else {
      setSections([]);
    }
  }, [form.courseId, form.year]);

  const submit = async () => {
    const { facultyId, courseId, year, semester, section } = form;

    if (!facultyId || !courseId || !year || !semester || !section) {
      return alert("All fields are required");
    }

    await api.post("/mentors/assign", form);
    alert("Mentor assigned successfully");
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Assign Mentor</h3>

      {/* FACULTY */}
      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, facultyId: e.target.value })
        }
      >
        <option value="">Select Faculty</option>
        {faculty.map((f) => (
          <option key={f._id} value={f._id}>
            {f.userId?.name} ({f.employeeId})
          </option>
        ))}
      </select>

      {/* COURSE */}
      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            courseId: e.target.value,
            year: "",
            semester: "",
            section: ""
          })
        }
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* YEAR */}
      <select
        className="border p-2 w-full mb-3"
        disabled={!form.courseId}
        onChange={(e) =>
          setForm({
            ...form,
            year: Number(e.target.value),
            semester: "",
            section: ""
          })
        }
      >
        <option value="">Select Year</option>
        {[1, 2, 3, 4].map((y) => (
          <option key={y} value={y}>
            Year {y}
          </option>
        ))}
      </select>

      {/* SEMESTER */}
      <select
        className="border p-2 w-full mb-3"
        disabled={!form.year}
        onChange={(e) =>
          setForm({ ...form, semester: Number(e.target.value) })
        }
      >
        <option value="">Select Semester</option>
        <option value={form.year * 2 - 1}>
          Semester {form.year * 2 - 1}
        </option>
        <option value={form.year * 2}>
          Semester {form.year * 2}
        </option>
      </select>

      {/* SECTION */}
      <select
        className="border p-2 w-full mb-4"
        disabled={!sections.length}
        onChange={(e) =>
          setForm({ ...form, section: e.target.value })
        }
      >
        <option value="">Select Section</option>
        {sections.map((s) => (
          <option key={s._id} value={s.section}>
            Section {s.section}
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Assign Mentor
      </button>
    </div>
  );
}
