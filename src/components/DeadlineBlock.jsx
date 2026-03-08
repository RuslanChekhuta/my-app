import { RiCalendarScheduleLine, RiCloseLine } from "react-icons/ri";
import formatDateTime from "../helpers/dateUtils";
import Button from "./ui/Button";
import FieldControl from "./ui/FieldControl";

const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  return (
    <div className="mt-4">
      {showDeadlineInput && (
        <div className="flex flex-col gap-3 rounded-[1.35rem] border border-slate-200 bg-[rgba(248,246,242,0.75)] p-3 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center">
          <FieldControl
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 bg-white/85 dark:bg-slate-950/75"
          />

          <div className="flex flex-wrap items-center gap-2">
            {deadline && (
              <Button onClick={() => setDeadline("")} variant="warmSoft" size="sm">
                Очистить
              </Button>
            )}

            <Button
              onClick={() => {
                setDeadline("");
                setShowDeadlineInput(false);
              }}
              variant="secondary"
              size="sm"
            >
              Скрыть
            </Button>
          </div>
        </div>
      )}
      {!showDeadlineInput && (
        <Button
          onClick={() => {
            setShowDeadlineInput(true);
          }}
          variant="secondary"
          size="sm"
          className="bg-white/80 dark:bg-slate-900/70"
        >
          {deadline ? (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span>Дедлайн: {formatDateTime(deadline)}</span>
              <RiCloseLine className="text-base opacity-60" />
            </>
          ) : (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span>Добавить дедлайн</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default DeadlineBlock;
