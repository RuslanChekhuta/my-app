import { useCallback, useEffect, useRef, useState } from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import { useSortable } from "@dnd-kit/sortable";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdata }) => {
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
  } = useSortable({ id: todo.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: isDragging ? 1 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdata(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, onUpdata, todo.id, editDeadline]);

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
      className="group flex justify-between items-center gap-3 bg-white dark:bg-page-dark shadow-sm hover:shadow-md p-4 border border-gray-100 rounded-lg transition-shadow duration-300"
    >
      <div
        {...listeners}
        className="mx-0.5 border-gray-300 border-r-6 border-l-6 border-dotted w-4 h-6 cursor-grab active:cursor-grabbing"
      ></div>
      <div className="flex items-center gap-3">
        <CheckboxButton completed={todo.completed} onClick={handleToggle} />
        {isEditing ? (
          <TodoEditForm
            editText={editText}
            setEditText={setEditText}
            innerRef={editFormRef}
            editDeadline={editDeadline}
            setEditDeadline={setEditDeadline}
            onSave={handleSave}
          />
        ) : (
          <TodoTextDisplay todo={todo} setIsEditing={setIsEditing} />
        )}
      </div>
      <DeleteButton onClick={() => onDelete(todo.id)} />
    </div>
  );
};
