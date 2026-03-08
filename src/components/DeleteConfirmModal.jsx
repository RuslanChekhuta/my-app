import { useEffect } from "react";
import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";

const DeleteConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <GlassPanel
        as="div"
        role="dialog"
        aria-modal="true"
        className="relative mx-4 w-full max-w-md rounded-[2rem] bg-white/90 p-6 text-slate-800 shadow-[0_35px_90px_rgba(17,35,46,0.28)] dark:bg-slate-950/90 dark:text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[rgba(229,122,74,0.18)] blur-3xl"></div>
        <div className="relative">
          <EyebrowChip tone="danger">Подтверждение</EyebrowChip>

          <h3 className="display-font mt-4 text-3xl font-semibold tracking-tight">
            Подтверждение удаления
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            {message}
          </p>
        </div>

        <div className="relative mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-12 cursor-pointer rounded-full border border-slate-200 bg-white/80 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-12 cursor-pointer rounded-full bg-[linear-gradient(135deg,#b52636_0%,#d84c5a_100%)] px-5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(181,38,54,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(181,38,54,0.3)]"
          >
            Удалить
          </button>
        </div>
      </GlassPanel>
    </div>
  );
};

export default DeleteConfirmModal;
