import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import LiveControl from "../../components/driver/LiveControl";

export default function DriverDashboard() {
  return (
    <DashboardLayout>
      {/* TOP STATUS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Bus Number" value="RJ14-BUS-01" />
        <StatCard title="Route" value="Route A" />
        <StatCard title="Status" value="Offline" />
      </div>

      {/* CONTROL PANEL */}
      <LiveControl />
    </DashboardLayout>
  );
}
