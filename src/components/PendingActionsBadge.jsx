import StatusPill from "./ui/StatusPill";
import { useLocalization } from "../hooks/useLocalization";

const PendingActionsBadge = ({ pendingActionsCount, isSyncingPending }) => {
  const { t } = useLocalization();
  const isIdle = pendingActionsCount === 0;
  const countLabel = t("pending.localChangesLabel", {
    count: pendingActionsCount,
  });

  return (
    <StatusPill
      tone={isIdle || isSyncingPending ? "accent" : "warm"}
      dot
      className="motion-fade-up motion-delay-3 w-full justify-center py-2 text-sm shadow-sm sm:w-fit sm:justify-start"
    >
      {isIdle
        ? t("pending.badge.idle")
        : isSyncingPending
          ? t("pending.badge.syncing", { countLabel })
          : t("pending.badge.waiting", { countLabel })}
    </StatusPill>
  );
};

export default PendingActionsBadge;
