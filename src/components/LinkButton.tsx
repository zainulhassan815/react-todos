import { Link } from "react-router-dom";
import { AppRoute } from "../app/Header";

interface LinkButtonProps {
  disabled?: boolean;
  location: AppRoute;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  disabled = false,
  location,
}) => {
  return (
    <Link
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      key={location.name}
      to={location.path}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-100 p-2 text-indigo-500 shadow-md transition-all duration-150 hover:bg-indigo-300 dark:bg-gray-900 dark:hover:bg-gray-700"
    >
      {location.icon}
      <span className="text-md">{location.name}</span>
    </Link>
  );
};

export default LinkButton;
