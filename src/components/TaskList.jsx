import TaskItem from "./TaskItem";

const TaskList = ({ data }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div>
      {data.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
