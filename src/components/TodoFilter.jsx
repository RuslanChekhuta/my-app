import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import Button from "./ui/Button";
import StatusPill from "./ui/StatusPill";

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
  return (
    <div className="motion-fade-up motion-delay-2 flex gap-2 overflow-x-auto pb-1 sm:justify-end">
      {FILTERS.map(({ id, label, icon, getCount }) => {
        const IconComponent = icon;
        const isSelected = filter === id;

        return (
          <Button
            key={id}
            onClick={() => setFilter(id)}
            variant="secondary"
            size="md"
            selected={isSelected}
            aria-label={label}
          >
            <IconComponent size={16} />
            <span>{label}</span>
            <StatusPill
              tone={isSelected ? "inverted" : "muted"}
              className="px-2 py-0.5 text-[11px]"
            >
              {getCount(todos)}
            </StatusPill>
          </Button>
        );
      })}
    </div>
  );
};

export default TodoFilter;
