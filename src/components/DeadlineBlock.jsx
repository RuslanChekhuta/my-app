import { RiCalendarScheduleLine, RiCloseLine } from "react-icons/ri";
import formatDateTime from "../helpers/dateUtils";
import { useLocalization } from "../hooks/useLocalization";
import Button from "./ui/Button";
import FieldControl from "./ui/FieldControl";

const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  const { locale, t } = useLocalization();

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

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            {deadline && (
              <Button
                onClick={() => setDeadline("")}
                variant="warmSoft"
                size="sm"
                className="w-full sm:w-auto"
              >
                {t("deadline.clear")}
              </Button>
            )}

            <Button
              onClick={() => {
                setDeadline("");
                setShowDeadlineInput(false);
              }}
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              {t("deadline.hide")}
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
          className="w-full justify-between gap-3 bg-white/80 text-left whitespace-normal dark:bg-slate-900/70 sm:w-auto sm:justify-center"
        >
          {deadline ? (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span className="min-w-0 flex-1 break-words">
                {t("deadline.value", {
                  date: formatDateTime(deadline, locale),
                })}
              </span>
              <RiCloseLine className="text-base opacity-60" />
            </>
          ) : (
            <>
              <RiCalendarScheduleLine className="text-base" />
              <span>{t("deadline.add")}</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default DeadlineBlock;
