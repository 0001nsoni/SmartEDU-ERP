import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("LOGIN BUTTON CLICKED");

      // 🔥 CALL BACKEND HERE
      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      // 🔥 STORE USER IN CONTEXT
      login(res.data.user, res.data.token);

      toast.success("Login successful");

      // 🔥 ROLE-BASED REDIRECT
      const role = res.data.user.role;

      if (role === "SUPER_ADMIN") navigate("/super-admin/dashboard");
      else if (role === "ADMIN" || role === "SUB_ADMIN") navigate("/admin");
      else if (role === "STUDENT") navigate("/student");
      else if (role === "FACULTY") navigate("/faculty");
      else if (role === "DRIVER") navigate("/driver");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
