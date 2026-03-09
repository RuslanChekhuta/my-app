import { memo, useCallback, useEffect, useRef, useState } from "react";
import { RiDraggable, RiEdit2Line } from "react-icons/ri";
import { CSS } from "@dnd-kit/utilities";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import Button from "./ui/Button";
import { useSortable } from "@dnd-kit/sortable";
import formatDateTime from "../helpers/dateUtils";
import { useLocalization } from "../hooks/useLocalization";
import { useTaskTranslation } from "../hooks/useTaskTranslation";

const ACTION_BUTTON_CLASS_NAME =
  "shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100";

const getTodoItemClassName = (
  todo,
  isDragging = false,
  isDragOverlay = false,
  isDropTarget = false
) =>
  `motion-fade-up motion-reorder group relative flex flex-col gap-2.5 overflow-hidden rounded-[1.5rem] border p-4 transition duration-200 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:p-5 ${
    todo.completed
      ? "border-[rgba(21,119,128,0.14)] bg-[rgba(231,245,244,0.85)] shadow-[0_18px_50px_rgba(17,35,46,0.06)] dark:border-[rgba(84,205,208,0.14)] dark:bg-[rgba(13,36,42,0.72)]"
      : "border-white/70 bg-white/90 shadow-[0_22px_55px_rgba(17,35,46,0.07)] hover:shadow-[0_30px_70px_rgba(17,35,46,0.12)] dark:border-white/10 dark:bg-slate-950/72"
  } ${
    isDragging || isDragOverlay
      ? "motion-reorder-active"
      : ""
  } ${
    isDropTarget
      ? "ring-2 ring-[rgba(21,119,128,0.2)] ring-offset-2 ring-offset-transparent dark:ring-[rgba(84,205,208,0.24)]"
      : ""
  }`;

const getDragHandleClassName = (isDragging, isSortable) =>
  `mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-500 ${
    isSortable
      ? "touch-none cursor-grab hover:border-[rgba(21,119,128,0.24)] hover:text-[#0e6971] active:cursor-grabbing dark:hover:border-[rgba(84,205,208,0.24)] dark:hover:text-[#8be4e6]"
      : "cursor-default opacity-60"
  } ${isDragging ? "motion-reorder-handle" : ""}`;

const TodoPreviewMeta = ({ todo }) => {
  const { locale, t } = useLocalization();
  const isOverdue =
    Boolean(todo.deadline) &&
    !todo.completed &&
    new Date(todo.deadline) < new Date();

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
        {t("common.created")}: {formatDateTime(todo.createdAt, locale)}
      </span>

      {todo.deadline ? (
        <span
          className={`rounded-full border px-3 py-1 ${
            todo.completed
              ? "border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
              : isOverdue
                ? "border-[rgba(181,38,54,0.18)] bg-[rgba(181,38,54,0.08)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be]"
                : "border-[rgba(229,122,74,0.18)] bg-[rgba(229,122,74,0.08)] text-[#a74f28] dark:border-[rgba(255,173,139,0.24)] dark:bg-[rgba(229,122,74,0.14)] dark:text-[#ffc7af]"
          }`}
        >
          {isOverdue ? t("common.overdue") : t("common.deadline")}:{" "}
          {formatDateTime(todo.deadline, locale)}
        </span>
      ) : null}
    </div>
  );
};

export const TodoItemPreview = ({ todo }) => {
  const { displayText } = useTaskTranslation(todo.text);

  return (
    <div
      className={`${getTodoItemClassName(todo, true, true)} pointer-events-none`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
        <div className={getDragHandleClassName(true, true)} aria-hidden="true">
          <RiDraggable className="text-lg" />
        </div>

        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
              todo.completed
                ? "border-[rgba(21,119,128,0.32)] bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] text-white shadow-[0_14px_32px_rgba(21,119,128,0.22)]"
                : "border-slate-200 bg-white/90 text-transparent dark:border-slate-700 dark:bg-slate-900/75"
            }`}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition ${todo.completed ? "text-white" : "text-transparent"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={`block break-words text-[0.98rem] font-medium leading-6 transition sm:text-[1.05rem] ${
                todo.completed
                  ? "text-slate-400 line-through dark:text-slate-500"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {displayText}
            </span>
            <TodoPreviewMeta todo={todo} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoItemComponent = ({
  todo,
  index = 0,
  onDelete,
  onToggleComplete,
  onUpdate,
  isSortable = true,
  isDropTarget = false,
  dropIndicatorSide = null,
}) => {
  const { t } = useLocalization();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    disabled: !isSortable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    zIndex: isDragging ? 20 : undefined,
    opacity: isDragging ? 0.38 : 1,
    animationDelay: `${Math.min(index, 10) * 45}ms`,
  };

  const dragHandleProps = isSortable ? { ...attributes, ...listeners } : {};

  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);

  useEffect(() => {
    if (!isEditing) {
      setEditText(todo.text);
      setEditDeadline(todo.deadline || "");
    }
  }, [todo.text, todo.deadline, isEditing]);

  useEffect(() => {
    const handlePointerDownOutside = (event) => {
      if (
        event.target instanceof Node &&
        editFormRef.current &&
        !editFormRef.current.contains(event.target)
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener("pointerdown", handlePointerDownOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [isEditing, handleSave]);

  const renderActionButtons = (className = "") => (
    <>
      <Button
        onClick={() => setIsEditing(true)}
        variant="secondary"
        size="icon"
        className={`${ACTION_BUTTON_CLASS_NAME} ${className}`.trim()}
        aria-label={t("task.edit")}
        title={t("task.edit")}
      >
        <RiEdit2Line className="text-[1.05rem]" />
      </Button>
      <DeleteButton
        onClick={() => onDelete(todo.id)}
        className={`${ACTION_BUTTON_CLASS_NAME} ${className}`.trim()}
      />
    </>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={getTodoItemClassName(todo, isDragging, false, isDropTarget)}
    >
      {isDropTarget && dropIndicatorSide ? (
        <div
          className={`pointer-events-none absolute left-4 right-4 z-10 h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(21,119,128,0.72),rgba(84,205,208,0.9))] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_8px_20px_rgba(21,119,128,0.24)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(84,205,208,0.18)] ${
            dropIndicatorSide === "top" ? "top-2.5" : "bottom-2.5"
          }`}
          aria-hidden="true"
        ></div>
      ) : null}

      <div className="flex min-w-0 w-full flex-1 items-start gap-3 sm:gap-4">
        <div className="flex shrink-0 flex-col items-center gap-3 sm:block">
          <div
            {...dragHandleProps}
            className={getDragHandleClassName(isDragging, isSortable)}
            aria-label={
              isSortable ? t("task.drag") : t("task.dragUnavailable")
            }
            aria-disabled={!isSortable}
          >
            <RiDraggable className="text-lg" />
          </div>

          <div className="sm:hidden">
            <CheckboxButton
              completed={todo.completed}
              onClick={handleToggle}
              className="mt-0"
            />
          </div>
        </div>

        <div className="flex min-w-0 w-full flex-1 items-start gap-3">
          <div className="hidden sm:block">
            <CheckboxButton completed={todo.completed} onClick={handleToggle} />
          </div>
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <TodoEditForm
                editText={editText}
                setEditText={setEditText}
                editDeadline={editDeadline}
                setEditDeadline={setEditDeadline}
                innerRef={editFormRef}
                onSave={handleSave}
              />
            ) : (
              <>
                <TodoTextDisplay
                  todo={todo}
                  setIsEditing={setIsEditing}
                  mobileActions={renderActionButtons("opacity-100")}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-2 sm:ml-3 sm:flex">
        {!isEditing ? renderActionButtons() : null}
      </div>
    </div>
  );
};

export const TodoItem = memo(TodoItemComponent);

TodoItem.displayName = "TodoItem";
