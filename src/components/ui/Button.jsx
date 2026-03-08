import { createElement } from "react";
import { cn } from "../../helpers/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] text-white shadow-[0_18px_40px_rgba(21,119,128,0.28)] hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(21,119,128,0.34)] dark:bg-[linear-gradient(135deg,#1f8d8d_0%,#40a9aa_100%)]",
  secondary:
    "border-slate-200 bg-white/85 text-slate-700 hover:border-[rgba(21,119,128,0.28)] hover:text-[#0e6971] dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[rgba(84,205,208,0.28)] dark:hover:text-[#8be4e6]",
  danger:
    "bg-[linear-gradient(135deg,#b52636_0%,#d84c5a_100%)] text-white shadow-[0_20px_40px_rgba(181,38,54,0.24)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(181,38,54,0.3)]",
  dangerSoft:
    "border-[rgba(181,38,54,0.16)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] hover:-translate-y-0.5 hover:bg-[rgba(181,38,54,0.12)] dark:border-[rgba(255,115,141,0.18)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be] dark:hover:bg-[rgba(181,38,54,0.2)]",
  successSoft:
    "border-[rgba(21,119,128,0.22)] bg-[rgba(21,119,128,0.1)] text-[#0e6971] hover:bg-[rgba(21,119,128,0.16)] dark:border-[rgba(84,205,208,0.22)] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6] dark:hover:bg-[rgba(84,205,208,0.18)]",
  warmSoft:
    "border-[rgba(229,122,74,0.18)] text-[#9a4a25] hover:bg-[rgba(229,122,74,0.08)] dark:border-[rgba(255,173,139,0.22)] dark:text-[#ffc7af] dark:hover:bg-[rgba(229,122,74,0.14)]",
  ghost:
    "border-transparent text-slate-400 hover:border-[rgba(181,38,54,0.16)] hover:bg-[rgba(181,38,54,0.08)] hover:text-[#8f1f2d] dark:text-slate-500 dark:hover:border-[rgba(255,115,141,0.16)] dark:hover:bg-[rgba(181,38,54,0.14)] dark:hover:text-[#ffb1be]",
};

const SIZE_CLASSES = {
  sm: "min-h-11 px-4 rounded-full text-sm",
  md: "min-h-12 px-5 rounded-full text-sm",
  lg: "min-h-14 px-5 rounded-[1.35rem] text-sm",
  icon: "h-11 w-11 rounded-2xl p-0 text-sm",
};

const SELECTED_CLASSES = {
  secondary:
    "border-transparent bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] text-white shadow-[0_18px_35px_rgba(21,119,128,0.22)] dark:bg-[linear-gradient(135deg,#1f8d8d_0%,#40a9aa_100%)]",
};

const Button = ({
  as = "button",
  type = "button",
  variant = "secondary",
  size = "md",
  selected = false,
  className = "",
  children,
  disabled = false,
  ...props
}) => {
  const elementProps = {
    className: cn(
      "inline-flex items-center justify-center gap-2 border font-semibold transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 motion-press",
      VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.secondary,
      SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
      selected && (SELECTED_CLASSES[variant] ?? SELECTED_CLASSES.secondary),
      className
    ),
    disabled,
    ...props,
  };

  if (as === "button") {
    elementProps.type = type;
  }

  return createElement(as, elementProps, children);
};

export default Button;
