interface Props {
  search: string;
  status: string;
  minBudget: string;
  maxBudget: string;
  statusOptions: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMinBudgetChange: (value: string) => void;
  onMaxBudgetChange: (value: string) => void;
}

export default function PositionFilters({
  search,
  status,
  minBudget,
  maxBudget,
  statusOptions,
  onSearchChange,
  onStatusChange,
  onMinBudgetChange,
  onMaxBudgetChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar por título, descripción o ubicación..."
        className="col-span-1 sm:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">Todos los estados</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Presupuesto min"
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
          value={minBudget}
          onChange={(e) => onMinBudgetChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Presupuesto max"
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
          value={maxBudget}
          onChange={(e) => onMaxBudgetChange(e.target.value)}
        />
      </div>
    </div>
  );
}
