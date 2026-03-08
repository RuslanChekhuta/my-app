import { TodoItem } from "./TodoItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RiInboxArchiveLine } from "react-icons/ri";

const TodoList = ({
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
  onReorder,
  filter,
}) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id !== over.id) {
      onReorder(active.id, over?.id);
    }
  };
  const todoIds = todos.map((t) => t.id);

  if (todos.length === 0) {
    const emptyMessage =
      filter === "completed"
        ? "Здесь появятся завершённые задачи."
        : filter === "active"
          ? "Все текущие задачи завершены или список пока пуст."
          : "Начните с первой задачи, и лента оживёт.";

    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-[rgba(248,246,242,0.7)] px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/55">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(21,119,128,0.1)] text-2xl text-[#0e6971] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]">
          <RiInboxArchiveLine />
        </div>
        <h3 className="display-font mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Пустая сцена
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
        <div className="motion-list flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              index={todo.order}
              todo={todo}
              onDelete={() => setDeletingId(todo.id)}
              onToggleComplete={toggleComplete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
