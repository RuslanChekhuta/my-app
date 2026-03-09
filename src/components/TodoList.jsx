import { useState } from "react";
import { TodoItem, TodoItemPreview } from "./TodoItem";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RiInboxArchiveLine } from "react-icons/ri";
import { createPortal } from "react-dom";
import { snapDragOverlayToPointer } from "../helpers/dndModifiers";
import { useLocalization } from "../hooks/useLocalization";

const TodoList = ({
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
  onReorder,
  filter,
}) => {
  const { t } = useLocalization();
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const isSortable = filter === "all";
  const activeTodo = todos.find((todo) => todo.id === activeId) ?? null;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 110,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const collisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    return closestCenter(args);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);
    setOverId(null);

    if (!over || active.id === over.id) {
      return;
    }

    onReorder(active.id, over.id);
  };

  const todoIds = todos.map((t) => t.id);
  const activeIndex = todos.findIndex((todo) => todo.id === activeId);
  const overIndex = todos.findIndex((todo) => todo.id === overId);

  if (todos.length === 0) {
    const emptyMessage =
      filter === "completed"
        ? t("list.empty.completed")
        : filter === "active"
          ? t("list.empty.active")
          : t("list.empty.all");

    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-[rgba(248,246,242,0.7)] px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/55">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(21,119,128,0.1)] text-2xl text-[#0e6971] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6]">
          <RiInboxArchiveLine />
        </div>
        <h3 className="display-font mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {t("list.emptyTitle")}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const listContent = (
    <div className="motion-list flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          index={todo.order}
          todo={todo}
          onDelete={setDeletingId}
          onToggleComplete={toggleComplete}
          onUpdate={handleUpdate}
          isSortable={isSortable}
          isDropTarget={
            isSortable &&
            activeId !== null &&
            overId !== null &&
            activeId !== overId &&
            todo.id === overId
          }
          dropIndicatorSide={
            isSortable &&
            activeId !== null &&
            overId !== null &&
            activeId !== overId &&
            todo.id === overId &&
            activeIndex !== -1 &&
            overIndex !== -1
              ? activeIndex < overIndex
                ? "bottom"
                : "top"
              : null
          }
        />
      ))}
    </div>
  );

  return (
    <>
      {!isSortable ? (
        <p className="mb-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {t("list.reorderHint")}
        </p>
      ) : null}

      {isSortable ? (
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={({ active }) => {
            setActiveId(active.id);
            setOverId(active.id);
          }}
          onDragOver={({ over }) => setOverId(over?.id ?? null)}
          onDragCancel={() => {
            setActiveId(null);
            setOverId(null);
          }}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
            {listContent}
          </SortableContext>

          {typeof document !== "undefined"
            ? createPortal(
                <DragOverlay
                  adjustScale={false}
                  dropAnimation={null}
                  modifiers={[snapDragOverlayToPointer]}
                >
                  {activeTodo ? <TodoItemPreview todo={activeTodo} /> : null}
                </DragOverlay>,
                document.body
              )
            : null}
        </DndContext>
      ) : (
        listContent
      )}
    </>
  );
};

export default TodoList;
