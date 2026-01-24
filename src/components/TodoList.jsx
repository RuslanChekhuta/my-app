const TodoList = ({ task, isCompleted }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div>
      {isCompleted && <s>{task}</s>}
      {!isCompleted && <span>{task}</span>}
    </div>
  );
};

export default TodoList;
