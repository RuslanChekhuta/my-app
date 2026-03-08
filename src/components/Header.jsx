import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import MetricCard from "./ui/MetricCard";

const Header = ({ todos, pendingActionsCount, isSyncingPending }) => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <GlassPanel className="motion-fade-up relative rounded-[2rem] p-6 shadow-[0_30px_100px_rgba(17,35,46,0.12)] sm:p-8">
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[rgba(229,122,74,0.18)] blur-3xl"></div>
      <div className="absolute bottom-[-3rem] left-[-1rem] h-48 w-48 rounded-full bg-[rgba(21,119,128,0.18)] blur-3xl"></div>

      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <EyebrowChip
            tone="neutral"
            leading={<span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>}
            className="mb-4"
          >
            Голосовой ввод. Работа офлайн. Контроль конфликтов.
          </EyebrowChip>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#0c2430_0%,#157780_100%)] shadow-[0_25px_60px_rgba(12,36,48,0.18)]">
              <div className="absolute top-3 left-3 h-3 w-3 rounded-full bg-[#e57a4a]"></div>
              <div className="absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full bg-[#f6efe4]"></div>
              <span className="display-font text-2xl font-bold text-white">
                S
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0e6971] dark:text-[#8be4e6]">
                Signal Tasks
              </p>
              <h1 className="display-font mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-6xl">
                Управляйте фокусом,
                <br className="hidden sm:block" /> а не хаосом.
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Современный центр задач для быстрых заметок, голосового ввода и
            аккуратной синхронизации даже на нестабильной сети.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard label="Активные" value={activeCount} />
          <MetricCard label="Готово" value={completedCount} />
          <MetricCard
            label="Синхронизация"
            value={
              pendingActionsCount > 0
                ? isSyncingPending
                  ? "Идёт обмен"
                  : `${pendingActionsCount} в очереди`
                : "Все чисто"
            }
            valueClassName="mt-2 text-lg font-semibold"
          />
        </div>
      </div>
    </GlassPanel>
  );
};

export default Header;
