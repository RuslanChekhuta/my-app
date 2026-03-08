import CheckedIcon from "./CheckedIcon";

const TodoEditForm = ({
  editText,
  setEditText,
  editDeadline,
  innerRef,
  setEditDeadline,
  onSave,
}) => {
  return (
    <div className="flex w-full flex-col gap-3" ref={innerRef}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSave()}
        autoFocus
        className="min-h-12 w-full rounded-2xl border border-[rgba(21,119,128,0.25)] bg-white/90 px-4 text-sm text-slate-800 outline-none transition focus:border-[rgba(21,119,128,0.5)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-[rgba(84,205,208,0.22)] dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-[rgba(84,205,208,0.4)] dark:focus:ring-[rgba(84,205,208,0.12)]"
      />

      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="min-h-12 w-full rounded-2xl border border-[rgba(21,119,128,0.25)] bg-white/90 px-4 text-sm text-slate-800 outline-none transition focus:border-[rgba(21,119,128,0.5)] focus:ring-4 focus:ring-[rgba(21,119,128,0.12)] dark:border-[rgba(84,205,208,0.22)] dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-[rgba(84,205,208,0.4)] dark:focus:ring-[rgba(84,205,208,0.12)] sm:flex-1"
        />
        <button
          type="button"
          onClick={onSave}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[rgba(21,119,128,0.22)] bg-[rgba(21,119,128,0.1)] px-4 text-sm font-semibold text-[#0e6971] transition hover:bg-[rgba(21,119,128,0.16)] dark:border-[rgba(84,205,208,0.22)] dark:bg-[rgba(84,205,208,0.12)] dark:text-[#8be4e6] dark:hover:bg-[rgba(84,205,208,0.18)] sm:px-5"
        >
          <CheckedIcon />
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  );
};

export default TodoEditForm;
