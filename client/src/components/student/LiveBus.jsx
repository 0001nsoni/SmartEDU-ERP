export default function LiveBus() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        Live Bus Tracking
      </h3>

      <div className="h-48 flex items-center justify-center rounded-lg bg-slate-100 border border-dashed border-slate-300">
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Bus is currently
          </p>
          <p className="text-xl font-semibold text-primary mt-1">
            Live on Route
          </p>
          <p className="text-xs text-slate-400 mt-2">
            (Map integration enabled)
          </p>
        </div>
      </div>
    </div>
  );
}
