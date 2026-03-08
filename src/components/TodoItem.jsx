import { useEffect, useRef, useState, useCallback } from "react";
import { RiDraggable } from "react-icons/ri";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import { useSortable } from "@dnd-kit/sortable";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
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
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: isDragging ? 20 : "auto",
    opacity: isDragging ? 0.92 : 1,
  };

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
    const handleClickOutside = (e) => {
      if (editFormRef.current && !editFormRef.current.contains(e.target)) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing, handleSave]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`group flex items-start justify-between gap-3 rounded-[1.5rem] border p-4 transition duration-300 sm:p-5 ${
        todo.completed
          ? "border-[rgba(21,119,128,0.14)] bg-[rgba(231,245,244,0.85)] shadow-[0_18px_50px_rgba(17,35,46,0.06)] dark:border-[rgba(84,205,208,0.14)] dark:bg-[rgba(13,36,42,0.72)]"
          : "border-white/70 bg-white/90 shadow-[0_22px_55px_rgba(17,35,46,0.07)] hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(17,35,46,0.12)] dark:border-white/10 dark:bg-slate-950/72"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
        <div
          {...listeners}
          className="mt-1 inline-flex h-10 w-10 shrink-0 cursor-grab items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition hover:border-[rgba(21,119,128,0.24)] hover:text-[#0e6971] active:cursor-grabbing dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-500 dark:hover:border-[rgba(84,205,208,0.24)] dark:hover:text-[#8be4e6]"
          aria-label="Перетащить задачу"
        >
          <RiDraggable className="text-lg" />
        </div>

        <div className="flex min-w-0 flex-1 items-start gap-3">
          <CheckboxButton completed={todo.completed} onClick={handleToggle} />
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
            <TodoTextDisplay todo={todo} setIsEditing={setIsEditing} />
          )}
        </div>
      </div>

      <DeleteButton onClick={() => onDelete(todo.id)} />
    </div>
  );
};
