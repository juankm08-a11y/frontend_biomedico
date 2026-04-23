import { ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
}

export default function PrimaryButton({ text, onClick, icon, type ="button"}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="flex items-center gap-2 border border-gray-400 px-3 py-2 text-center-sm font-medium hover:bg-gray-100 transition"
    >
      {icon}
      {text}
    </button>
  );
}
