import { useCallback, useEffect, useRef, useState } from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdata }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");

  const editFormRef = useRef(null);

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
    <div className="group flex justify-between items-center gap-3 bg-white dark:bg-page-dark shadow-sm hover:shadow-md p-4 border border-gray-100 rounded-lg transition-shadow duration-300">
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
