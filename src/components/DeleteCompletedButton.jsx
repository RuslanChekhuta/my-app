const DeleteCompletedButton = ({ hasCompletedTodos, onClick }) => {
  if (!hasCompletedTodos) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex min-h-12 self-center rounded-full border border-[rgba(181,38,54,0.16)] bg-[rgba(181,38,54,0.08)] px-5 text-sm font-semibold text-[#8f1f2d] transition hover:-translate-y-0.5 hover:bg-[rgba(181,38,54,0.12)] dark:border-[rgba(255,115,141,0.18)] dark:bg-[rgba(181,38,54,0.14)] dark:text-[#ffb1be] dark:hover:bg-[rgba(181,38,54,0.2)]"
    >
      Очистить завершённые задачи
    </button>
  );
};

export default DeleteCompletedButton;
