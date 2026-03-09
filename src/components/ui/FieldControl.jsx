import { createElement } from "react";
import { cn } from "../../helpers/cn";

const FieldControl = ({
  as = "input",
  className = "",
  children,
  ...props
}) => {
  return createElement(
    as,
    {
      className: cn(
        "min-h-12 w-full min-w-0 rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[rgba(21,119,128,0.5)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[rgba(84,205,208,0.4)] dark:focus:ring-[rgba(84,205,208,0.12)]",
        className
      ),
      ...props,
    },
    children
  );
};

export default FieldControl;
