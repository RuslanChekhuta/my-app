import { cn } from "../../helpers/cn";

const TONE_CLASSES = {
  accent:
    "border-[rgba(21,119,128,0.18)] bg-[rgba(21,119,128,0.09)] text-[#0e6971] dark:border-[rgba(84,205,208,0.2)] dark:bg-[rgba(84,205,208,0.08)] dark:text-[#8be4e6]",
  neutral:
    "border-slate-200/80 bg-white/85 text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300",
  danger:
    "border-[rgba(181,38,54,0.16)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.16)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]",
};

const EyebrowChip = ({
  icon: Icon,
  leading = null,
  tone = "accent",
  className = "",
  children,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
        TONE_CLASSES[tone] ?? TONE_CLASSES.accent,
        className
      )}
    >
      {leading}
      {Icon ? <Icon className="text-sm" /> : null}
      {children}
    </div>
  );
};

export default EyebrowChip;
