import { useState } from "react";

export default function Button({ text, onClick, color, isActive }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    console.log("Clicked:", text);
    setClicked(true);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`
        text-black 
        hover:bg-lightgreen
        ${isActive ? "bg-lightgreen text-white" : "bg-white text-black"}
        m-2 
        rounded-md 
        p-2 
        shadow-lg 
        transition 
        duration-200 
        ease-in-out
      `}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
