import { useEffect } from "react";

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
      <div
        role="dialog"
        aria-modal="true"
        className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 text-gray-800 shadow-xl dark:bg-gray-800 dark:text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="mb-4 text-xl font-bold">Подтверждение удаления</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
