import { cn } from "../../helpers/cn";

const TONE_CLASSES = {
  accent:
    "border-[rgba(21,119,128,0.16)] bg-[rgba(21,119,128,0.08)] text-[#0e6971] dark:border-[rgba(84,205,208,0.18)] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]",
  neutral:
    "border-slate-200 bg-white/80 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300",
  warm:
    "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.12)] text-[#9a4a25] dark:border-[rgba(255,173,139,0.18)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]",
  danger:
    "border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]",
  muted:
    "border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400",
  inverted: "border-white/15 bg-white/20 text-white",
};

const DOT_TONE_CLASSES = {
  accent: "bg-[#157780]",
  neutral: "bg-slate-400 dark:bg-slate-500",
  warm: "bg-[#e57a4a]",
  danger: "bg-[#c23647]",
  muted: "bg-slate-400 dark:bg-slate-600",
  inverted: "bg-white",
};

const StatusPill = ({
  icon: Icon,
  tone = "neutral",
  dot = false,
  animatedDot = false,
  className = "",
  children,
}) => {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-left text-xs leading-5 font-medium whitespace-normal break-words",
        TONE_CLASSES[tone] ?? TONE_CLASSES.neutral,
        className
      )}
    >
      {dot ? (
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            DOT_TONE_CLASSES[tone] ?? DOT_TONE_CLASSES.neutral,
            animatedDot && "animate-pulse"
          )}
        ></span>
      ) : null}
      {Icon ? <Icon className="text-sm" /> : null}
      {children}
    </span>
  );
};

export default StatusPill;
