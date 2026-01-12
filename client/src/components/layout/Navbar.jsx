import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // If not logged in → show minimal navbar
  if (!user) {
    return (
      <nav className="bg-white shadow px-4 py-3">
        <h1 className="text-lg font-bold text-primary">
          SmartEdu ERP
        </h1>
      </nav>
    );
  }

  // Role-based dashboard route
  const dashboardRoute =
    user.role === "SUPER_ADMIN"
      ? "/super-admin/dashboard"
      : user.role === "ADMIN"
      ? "/admin"
      : user.role === "FACULTY"
      ? "/faculty"
      : user.role === "STUDENT"
      ? "/student"
      : "/driver";

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-primary">
        SmartEdu ERP
      </h1>

      <div className="hidden md:flex gap-6 items-center text-slate-700">
        <Link
          to={dashboardRoute}
          className="hover:text-primary cursor-pointer"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="hover:text-primary cursor-pointer"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="hover:text-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
