import { RiCheckboxCircleLine, RiQuestionLine } from "react-icons/ri";
import { useLocalization } from "../hooks/useLocalization";
import Button from "./ui/Button";
import GlassPanel from "./ui/GlassPanel";

const VIEWS = [
  {
    id: "tasks",
    icon: RiCheckboxCircleLine,
    labelKey: "nav.tasks",
  },
  {
    id: "faq",
    icon: RiQuestionLine,
    labelKey: "nav.faq",
  },
];

const AppViewSwitcher = ({ currentPage, onChange }) => {
  const { t } = useLocalization();

  return (
    <GlassPanel
      as="div"
      className="inline-flex w-full max-w-full flex-wrap items-center gap-2 rounded-[1.45rem] border border-slate-200/80 bg-white/80 p-2 shadow-[0_18px_45px_rgba(17,35,46,0.08)] dark:border-white/10 dark:bg-[rgba(8,18,34,0.78)] lg:w-auto"
    >
      {VIEWS.map((view) => (
        <Button
          key={view.id}
          onClick={() => onChange(view.id)}
          variant="secondary"
          size="md"
          selected={currentPage === view.id}
          className="min-w-0 flex-1 justify-center px-4 lg:flex-none"
        >
          <view.icon className="text-base" />
          <span className="truncate">{t(view.labelKey)}</span>
        </Button>
      ))}
    </GlassPanel>
  );
};

export default AppViewSwitcher;
