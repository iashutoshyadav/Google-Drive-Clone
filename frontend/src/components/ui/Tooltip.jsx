import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 px-2 py-1 rounded-md text-xs text-white bg-gray-800 shadow-md">
          {text}
        </div>
      )}
    </div>
  );
}
