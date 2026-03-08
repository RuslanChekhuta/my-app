import { cn } from "../../helpers/cn";

const TONE_CLASSES = {
  error:
    "border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]",
  success:
    "border-[rgba(21,119,128,0.18)] bg-[rgba(21,119,128,0.08)] text-[#0e6971] dark:border-[rgba(84,205,208,0.2)] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]",
  info:
    "border-slate-200 bg-[rgba(255,255,255,0.82)] text-slate-700 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100",
  warning:
    "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.08)] text-[#9a4a25] dark:border-[rgba(255,173,139,0.2)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]",
};

const StatusMessage = ({
  tone = "info",
  icon = null,
  className = "",
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[1.35rem] border px-4 py-3 text-sm leading-6 shadow-[0_25px_55px_rgba(17,35,46,0.08)] backdrop-blur-xl",
        TONE_CLASSES[tone] ?? TONE_CLASSES.info,
        className
      )}
    >
      {icon ? <div className="mt-0.5">{icon}</div> : null}
      <div>{children}</div>
    </div>
  );
};

export default StatusMessage;
