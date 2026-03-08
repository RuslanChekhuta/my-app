import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-t-2 border-b-2 border-b-blue-700 rounded-full w-10 h-10 animate-spin"></div>
    </div>
  );
};

export default Loader;
