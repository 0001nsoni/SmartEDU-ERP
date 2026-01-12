import CreateAdmin from "./CreateAdmin";
import Institutions from "./Institutions";

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Super Admin Panel
      </h1>

      <Institutions />
      <CreateAdmin/>
    </div>
  );
}
