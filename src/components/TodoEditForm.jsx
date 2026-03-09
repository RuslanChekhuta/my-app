import Button from "./ui/Button";
import FieldControl from "./ui/FieldControl";
import CheckedIcon from "./CheckedIcon";
import { useLocalization } from "../hooks/useLocalization";

const TodoEditForm = ({
  editText,
  setEditText,
  editDeadline,
  innerRef,
  setEditDeadline,
  onSave,
}) => {
  const { t } = useLocalization();

  return (
    <div className="flex w-full flex-col gap-3" ref={innerRef}>
      <FieldControl
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSave()}
        autoFocus
        className="border-[rgba(21,119,128,0.25)] dark:border-[rgba(84,205,208,0.22)]"
      />

      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <FieldControl
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="border-[rgba(21,119,128,0.25)] dark:border-[rgba(84,205,208,0.22)] sm:flex-1"
        />
        <Button
          onClick={onSave}
          variant="successSoft"
          size="md"
          className="w-full justify-center sm:w-auto"
        >
          <CheckedIcon />
          <span>{t("common.save")}</span>
        </Button>
      </div>
    </div>
  );
};

export default TodoEditForm;
