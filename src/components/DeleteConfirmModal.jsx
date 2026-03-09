import { useEffect } from "react";
import Button from "./ui/Button";
import EyebrowChip from "./ui/EyebrowChip";
import GlassPanel from "./ui/GlassPanel";
import { useLocalization } from "../hooks/useLocalization";

const DeleteConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  const { t } = useLocalization();

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
      className="motion-fade-in fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-4"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <GlassPanel
        as="div"
        role="dialog"
        aria-modal="true"
        className="motion-scale-in relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white/90 p-5 text-slate-800 shadow-[0_35px_90px_rgba(17,35,46,0.28)] dark:bg-slate-950/90 dark:text-white sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[rgba(229,122,74,0.18)] blur-3xl"></div>
        <div className="relative">
          <EyebrowChip tone="danger">{t("deleteConfirm.eyebrow")}</EyebrowChip>

          <h3 className="display-font mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("deleteConfirm.title")}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            {message}
          </p>
        </div>

        <div className="relative mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onCancel} variant="secondary" size="md">
            {t("common.cancel")}
          </Button>
          <Button onClick={onConfirm} variant="danger" size="md">
            {t("common.delete")}
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
};

export default DeleteConfirmModal;
