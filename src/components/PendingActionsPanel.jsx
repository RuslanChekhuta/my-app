import {
  RiArrowUpCircleLine,
  RiCloudLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { CONFLICT_STRATEGIES } from "../constants/todos";
import FieldControl from "./ui/FieldControl";
import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import MetricCard from "./ui/MetricCard";
import StatusPill from "./ui/StatusPill";
import { useLocalization } from "../hooks/useLocalization";
import { useTaskTranslation } from "../hooks/useTaskTranslation";

const getPendingItemTitle = (action, t) => {
  if (action.todo?.text) {
    return action.todo.text;
  }

  if (action.type === "delete") {
    return t("pending.fallbackTitle", { id: action.todoId });
  }

  return t("common.untitledTask");
};

const PendingActionTitle = ({ title }) => {
  const { displayText } = useTaskTranslation(title);

  return <>{displayText}</>;
};

const PendingActionsPanel = ({
  pendingActions,
  isSyncingPending,
  conflictStrategy,
  setConflictStrategy,
}) => {
  const { t } = useLocalization();

  return (
    <GlassPanel className="motion-fade-up motion-delay-4 p-4 shadow-[0_30px_100px_rgba(17,35,46,0.09)] sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="min-w-0">
          <EyebrowChip icon={RiCloudLine}>{t("pending.centerEyebrow")}</EyebrowChip>

          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {t("pending.queueTitle")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {pendingActions.length === 0
              ? t("pending.description.idle")
              : isSyncingPending
                ? t("pending.description.syncing")
                : t("pending.description.waiting")}
          </p>
        </div>

        <div className="grid gap-3 min-[420px]:grid-cols-2 xl:grid-cols-1">
          <MetricCard
            label={t("pending.metric.queue")}
            value={pendingActions.length}
            className="bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70"
            valueClassName="mt-2 text-2xl font-semibold"
          />
          <MetricCard
            label={t("pending.metric.status")}
            value={
              isSyncingPending
                ? t("pending.status.syncing")
                : t("pending.status.waiting")
            }
            className="bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70"
            valueClassName="mt-2 text-sm font-semibold"
          />
          <MetricCard
            label={t("pending.metric.strategy")}
            value={
              conflictStrategy === CONFLICT_STRATEGIES.LOCAL_WINS
                ? t("pending.strategy.local")
                : t("pending.strategy.server")
            }
            className="bg-[rgba(248,246,242,0.8)] p-3 dark:border-slate-800 dark:bg-slate-900/70"
            valueClassName="mt-2 text-sm font-semibold"
          />
        </div>

        <label className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
          <span>{t("pending.strategy.select")}</span>
          <FieldControl
            as="select"
            value={conflictStrategy}
            onChange={(event) => setConflictStrategy(event.target.value)}
            className="bg-white/85 dark:bg-slate-900/75"
          >
            <option value={CONFLICT_STRATEGIES.LOCAL_WINS}>
              {t("pending.strategy.local")}
            </option>
            <option value={CONFLICT_STRATEGIES.SERVER_WINS}>
              {t("pending.strategy.server")}
            </option>
          </FieldControl>
        </label>
      </div>

      <div className="mt-5 space-y-3">
        {pendingActions.length === 0 ? (
          <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-[rgba(248,246,242,0.72)] p-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/55 dark:text-slate-300">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(21,119,128,0.08)] text-[#0e6971] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]">
              <RiShieldCheckLine className="text-lg" />
            </div>
            {t("pending.empty")}
          </div>
        ) : (
          pendingActions.map((action, index) => (
            <div
              key={`${action.type}-${action.todoId}-${index}`}
              className="rounded-[1.35rem] border border-slate-200 bg-[rgba(248,246,242,0.76)] p-4 dark:border-slate-800 dark:bg-slate-900/72"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <EyebrowChip
                      icon={RiArrowUpCircleLine}
                      tone="neutral"
                      className="tracking-[0.18em]"
                    >
                      {t(`pending.action.${action.type}`)}
                    </EyebrowChip>
                    <p className="mt-3 break-words text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
                      <PendingActionTitle title={getPendingItemTitle(action, t)} />
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {action.baseTodoSnapshot
                        ? t("pending.snapshot.present")
                        : t("pending.snapshot.absent")}
                    </p>
                  </div>

                  <StatusPill
                    tone={isSyncingPending && index === 0 ? "accent" : "warm"}
                    className="w-full px-3 py-1 sm:w-fit"
                  >
                    {isSyncingPending && index === 0
                      ? t("pending.item.syncing")
                      : t("pending.item.waiting")}
                  </StatusPill>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassPanel>
  );
};

export default PendingActionsPanel;
