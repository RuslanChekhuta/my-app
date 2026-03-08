const DeleteButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-transparent text-slate-400 opacity-100 transition hover:border-[rgba(181,38,54,0.16)] hover:bg-[rgba(181,38,54,0.08)] hover:text-[#8f1f2d] sm:opacity-0 sm:group-hover:opacity-100 dark:text-slate-500 dark:hover:border-[rgba(255,115,141,0.16)] dark:hover:bg-[rgba(181,38,54,0.14)] dark:hover:text-[#ffb1be]"
      aria-label="Удалить задачу"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

export default DeleteButton;
