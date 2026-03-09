import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import MetricCard from "./ui/MetricCard";
import { useLocalization } from "../hooks/useLocalization";

const Header = ({ todos, pendingActionsCount, isSyncingPending }) => {
  const { t } = useLocalization();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <GlassPanel className="motion-fade-up relative rounded-[2rem] p-4 shadow-[0_30px_100px_rgba(17,35,46,0.12)] sm:p-6 lg:p-8">
      <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[rgba(229,122,74,0.18)] blur-3xl sm:h-40 sm:w-40"></div>
      <div className="absolute bottom-[-2rem] left-[-0.75rem] h-36 w-36 rounded-full bg-[rgba(21,119,128,0.18)] blur-3xl sm:bottom-[-3rem] sm:h-48 sm:w-48"></div>

      <div className="relative flex flex-col gap-6 lg:gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl min-w-0">
          <EyebrowChip
            tone="neutral"
            leading={<span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>}
            className="mb-4 text-[10px] tracking-[0.18em] sm:text-[11px]"
          >
            {t("header.eyebrow")}
          </EyebrowChip>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#0c2430_0%,#157780_100%)] shadow-[0_25px_60px_rgba(12,36,48,0.18)] sm:h-16 sm:w-16 sm:rounded-[1.4rem]">
              <div className="absolute top-3 left-3 h-3 w-3 rounded-full bg-[#e57a4a]"></div>
              <div className="absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full bg-[#f6efe4]"></div>
              <span className="display-font text-xl font-bold text-white sm:text-2xl">
                S
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0e6971] dark:text-[#8be4e6]">
                {t("common.appName")}
              </p>
              <h1 className="display-font mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-6xl">
                {t("header.titleTop")}
                <br className="hidden sm:block" /> {t("header.titleBottom")}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            {t("header.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
          <MetricCard label={t("header.metrics.active")} value={activeCount} />
          <MetricCard
            label={t("header.metrics.completed")}
            value={completedCount}
          />
          <MetricCard
            label={t("header.metrics.sync")}
            value={
              pendingActionsCount > 0
                ? isSyncingPending
                  ? t("header.sync.inProgress")
                  : t("header.sync.queue", { count: pendingActionsCount })
                : t("header.sync.clean")
            }
            valueClassName="mt-2 text-base font-semibold sm:text-lg"
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default Header;
