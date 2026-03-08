import Button from "./ui/Button";

const CheckboxButton = ({ completed, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={completed ? "primary" : "secondary"}
      size="icon"
      className={`mt-1 shrink-0 ${
        completed
          ? "border-[rgba(21,119,128,0.32)] shadow-[0_14px_32px_rgba(21,119,128,0.22)]"
          : "bg-white/90 text-transparent dark:border-slate-700 dark:bg-slate-900/75"
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
    </Button>
  );
};

export default CheckboxButton;
