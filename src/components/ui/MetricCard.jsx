import { cn } from "../../helpers/cn";

const MetricCard = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
}) => {
  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80",
        className
      )}
    >
      <p
        className={cn(
          "text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400",
          labelClassName
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-2 break-words text-3xl font-bold text-slate-900 dark:text-slate-50",
          valueClassName
        )}
      >
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
