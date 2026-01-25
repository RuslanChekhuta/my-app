const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-gray-100 rounded dark:bg-gray-700">
      <button
        onClick={() => onToggle(todo.id)}
        className={
          "w-6 h-6 flex items-center justify-center border rounded mr-3 " +
          (todo.completed ? "bg-green-500 border-green-500" : "border-gray-400")
        }
      >
        ✓
      </button>

      <span
        className={
          "flex-1 " +
          (todo.completed
            ? "line-through text-gray-500 dark:text-gray-400"
            : "text-gray-800 dark:text-white")
        }
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;
