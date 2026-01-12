import { useState } from "react";
import gsap from "gsap";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    gsap.to(".sidebar", {
      width: open ? 80 : 260,
      duration: 0.4,
      ease: "power2.out"
    });
    setOpen(!open);
  };

  return (
    <aside className="sidebar hidden md:flex flex-col bg-white border-r">
      <div className="p-4 font-bold text-primary">
        ERP
      </div>

      <nav className="flex-1 px-2 space-y-2">
        <div className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer">
          Dashboard
        </div>
        <div className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer">
          Timetable
        </div>
        <div className="p-3 rounded-xl hover:bg-slate-100 cursor-pointer">
          Attendance
        </div>
      </nav>

      <button
        onClick={toggle}
        className="m-4 p-2 rounded-xl bg-slate-100"
      >
        Toggle
      </button>
    </aside>
  );
}
