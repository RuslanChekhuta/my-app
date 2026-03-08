import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";

const FILTERS = [
  {
    id: "all",
    label: "Все",
    icon: MdOutlineFilterList,
    getCount: (todos) => todos.length,
  },
  {
    id: "active",
    label: "В работе",
    icon: FaRegCircle,
    getCount: (todos) => todos.filter((todo) => !todo.completed).length,
  },
  {
    id: "completed",
    label: "Готово",
    icon: FaCheckCircle,
    getCount: (todos) => todos.filter((todo) => todo.completed).length,
  },
];

const TodoFilter = ({ filter, setFilter, todos }) => {
  const buttonClasses = (currentFilter) =>
    `inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${
      filter === currentFilter
        ? "border-transparent bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] text-white shadow-[0_18px_35px_rgba(21,119,128,0.22)]"
        : "border-slate-200 bg-white/85 text-slate-700 hover:border-[rgba(21,119,128,0.24)] hover:text-[#0e6971] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[rgba(84,205,208,0.28)] dark:hover:text-[#8be4e6]"
    }`;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:justify-end">
      {FILTERS.map(({ id, label, icon, getCount }) => {
        const IconComponent = icon;

        return (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={buttonClasses(id)}
            aria-label={label}
          >
            <IconComponent size={16} />
            <span>{label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                filter === id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {getCount(todos)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TodoFilter;
