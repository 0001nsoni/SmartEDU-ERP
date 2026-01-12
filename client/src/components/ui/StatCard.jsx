export default function StatCard({ title, value }) {
  return (
    <div className="card p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
