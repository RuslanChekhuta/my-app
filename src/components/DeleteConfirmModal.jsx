import React from "react";

const DeleteConfirmModal = ({ onCancel, onConfirm, message }) => {
  return (
    <>
      <div className="fixed inset-0">
        <div className="z-4 absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        <div className="z-5 relative flex justify-center items-center p-4 h-full">
          <div className="bg-white dark:bg-gray-800 shadow-xl mx-4 p-6 rounded-lg w-full max-w-md text-gray-800 dark:text-white">
            <h3 className="mb-4 text-xl fond-bold">Подтверждение удаления</h3>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end gap-3" onClick={onCancel}>
              <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded transition-colors cursor-pointer">
                Отмена
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 pt-2 rounded text-white transition-colors cursor-pointer"
                onClick={onConfirm}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
