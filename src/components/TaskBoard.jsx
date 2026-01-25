import TaskList from "./TaskList";

const TaskBoard = () => {
  // TODO: Реализуйте логику здесь.
  const tasks = [
    { id: 1, title: "Выучить React", isDone: false },
    { id: 2, title: "Установить Node.js", isDone: true },
    { id: 3, title: "Повторить JavaScript", isDone: false },
  ];

  return (
    <div className="card">
      <TaskList data={tasks} />
    </div>
  );
};

export default TaskBoard;
