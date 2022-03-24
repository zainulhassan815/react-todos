import { FunctionComponent, MouseEventHandler } from "react";

interface IconButtonProps {
  icon: JSX.Element;
  styleOverrides?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  styleOverrides,
  onClick,
}) => {
  return (
    <button
      className={`inline-grid h-12 w-12 place-content-center rounded-full bg-indigo-100 p-2 text-indigo-500 transition-all duration-150 hover:scale-105 hover:bg-indigo-500 hover:text-white hover:shadow-sm dark:bg-gray-700
      ${styleOverrides ?? ""}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
