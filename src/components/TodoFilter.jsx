import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { useLocalization } from "../hooks/useLocalization";
import Button from "./ui/Button";
import StatusPill from "./ui/StatusPill";

const TodoFilter = ({ filter, setFilter, todos }) => {
  const { t } = useLocalization();
  const filters = [
    {
      id: "all",
      label: t("filter.all"),
      icon: MdOutlineFilterList,
      getCount: (items) => items.length,
    },
    {
      id: "active",
      label: t("filter.active"),
      icon: FaRegCircle,
      getCount: (items) => items.filter((todo) => !todo.completed).length,
    },
    {
      id: "completed",
      label: t("filter.completed"),
      icon: FaCheckCircle,
      getCount: (items) => items.filter((todo) => todo.completed).length,
    },
  ];

  return (
    <div className="motion-fade-up motion-delay-2 grid w-full grid-cols-1 gap-2 min-[480px]:grid-cols-2 md:grid-cols-3">
      {filters.map(({ id, label, icon, getCount }) => {
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
            className="min-w-0 w-full justify-between gap-x-2 gap-y-1 px-4 text-left whitespace-normal [flex-wrap:wrap]"
          >
            <IconComponent size={16} className="shrink-0" />
            <span className="min-w-0 flex-1 break-words leading-5">
              {label}
            </span>
            <StatusPill
              tone={isSelected ? "inverted" : "muted"}
              className="shrink-0 px-2 py-0.5 text-[11px]"
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
