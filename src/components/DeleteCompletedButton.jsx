import Button from "./ui/Button";

const DeleteCompletedButton = ({ hasCompletedTodos, onClick }) => {
  if (!hasCompletedTodos) return null;

  return (
    <Button
      onClick={onClick}
      variant="dangerSoft"
      size="md"
      className="motion-fade-up motion-delay-4 mt-5 self-center"
    >
      Очистить завершённые задачи
    </Button>
  );
};

export default DeleteCompletedButton;
