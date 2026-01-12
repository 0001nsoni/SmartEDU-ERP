import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl border w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          SmartEdu ERP
        </h1>

        <p className="text-slate-600 mt-2">
          Academic & Institutional Management System
        </p>

        <div className="mt-8 space-y-4">
          {/* Regular Users */}
          <Link
            to="/login"
            className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90"
          >
            Login (Student / Faculty / Admin)
          </Link>

          {/* Super Admin */}
          <Link
            to="/super-admin/login"
            className="block w-full border border-primary text-primary py-3 rounded-lg font-medium hover:bg-primary hover:text-white"
          >
            Super Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
