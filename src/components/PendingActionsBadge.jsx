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
    <div
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${
        isIdle
          ? "border-[rgba(21,119,128,0.16)] bg-[rgba(21,119,128,0.08)] text-[#0e6971] dark:border-[rgba(84,205,208,0.18)] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]"
          : "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.1)] text-[#9a4a25] dark:border-[rgba(255,173,139,0.18)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isIdle ? "bg-[#157780]" : isSyncingPending ? "bg-[#157780]" : "bg-[#e57a4a]"
        }`}
      ></span>
      <span>
        {isIdle
          ? "Все изменения синхронизированы"
          : isSyncingPending
            ? `Синхронизация: ${getPendingLabel(pendingActionsCount)}`
            : `Ожидает синхронизации: ${getPendingLabel(pendingActionsCount)}`}
      </span>
    </div>
  );
};

export default PendingActionsBadge;
