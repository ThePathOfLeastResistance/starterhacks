import React from "react";

interface ControlButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ isActive, onClick }) => {
  return (
    <div className="absolute inset-x-0 bottom-4 flex justify-center">
      <button
        onClick={onClick}
        className={`font-bold py-6 px-5 rounded-full ${
          isActive
            ? "bg-red-500 hover:bg-red-700 text-white"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        {isActive ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default ControlButton;
