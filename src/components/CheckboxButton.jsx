const CheckboxButton = ({ completed, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border cursor-pointer transition ${
        completed
          ? "border-[rgba(21,119,128,0.32)] bg-[linear-gradient(135deg,#157780_0%,#1f8d8d_100%)] text-white shadow-[0_14px_32px_rgba(21,119,128,0.22)]"
          : "border-slate-200 bg-white/90 text-transparent hover:border-[rgba(21,119,128,0.26)] dark:border-slate-700 dark:bg-slate-900/75"
      }`}
      aria-label={
        completed ? "Отметить как невыполненную" : "Отметить как выполненную"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 transition ${completed ? "text-white" : "text-transparent"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  );
};

export default CheckboxButton;
