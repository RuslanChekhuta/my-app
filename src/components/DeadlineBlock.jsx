import React from "react";

const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  return (
    <>
      {" "}
      {showDeadlineInput && (
        <div className="flex items-center gap-2 mt-2 border-blue-500 text-gray-500">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
            className="p-2 hover:text-gray-700 cursor-pointer"
          >
            Отмена
          </button>
        </div>
      )}
      {!showDeadlineInput && (
        <button
          type="button"
          onClick={() => {
            setDeadline("");
            setShowDeadlineInput(true);
          }}
          className="p-2 text-blue-500 hover:text-blue-700"
        >
          + Добавить дедлайн
        </button>
      )}
    </>
  );
};

export default DeadlineBlock;
