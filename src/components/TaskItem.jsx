const TaskItem = ({ task }) => {
  const className = task.isDone ? "task-done" : "task-active";
  return <div className={className}>{task.title}</div>;
};

export default TaskItem;
