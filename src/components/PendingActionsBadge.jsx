import StatusPill from "./ui/StatusPill";

const getPendingLabel = (count) => {
  if (count === 1) {
    return "1 локальное изменение";
  }

  if (count > 1 && count < 5) {
    return `${count} локальных изменения`;
  }

  return `${count} локальных изменений`;
};

const PendingActionsBadge = ({ pendingActionsCount, isSyncingPending }) => {
  const isIdle = pendingActionsCount === 0;

  return (
    <StatusPill
      tone={isIdle || isSyncingPending ? "accent" : "warm"}
      dot
      className="motion-fade-up motion-delay-3 w-fit py-2 text-sm shadow-sm"
    >
      {isIdle
        ? "Все изменения синхронизированы"
        : isSyncingPending
          ? `Синхронизация: ${getPendingLabel(pendingActionsCount)}`
          : `Ожидает синхронизации: ${getPendingLabel(pendingActionsCount)}`}
    </StatusPill>
  );
};

export default PendingActionsBadge;
