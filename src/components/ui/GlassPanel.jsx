import { createElement } from "react";
import { cn } from "../../helpers/cn";

const GlassPanel = ({
  as = "section",
  className = "",
  children,
  ...props
}) => {
  return createElement(
    as,
    {
      className: cn(
        "min-w-0 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/82 shadow-[0_30px_100px_rgba(17,35,46,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/68",
        className
      ),
      ...props,
    },
    children
  );
};

export default GlassPanel;
