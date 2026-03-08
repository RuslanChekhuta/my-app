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
  if (pendingActionsCount === 0) {
    return null;
  }

  return (
    <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 shadow-sm dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
      <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
      <span>
        {isSyncingPending
          ? `Синхронизация: ${getPendingLabel(pendingActionsCount)}`
          : `Ожидает sync: ${getPendingLabel(pendingActionsCount)}`}
      </span>
    </div>
  );
};

export default PendingActionsBadge;
