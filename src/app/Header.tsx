import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AppRoute {
  name: string;
  icon?: JSX.Element;
  path: string;
}

interface TodosHeaderProps {
  icon: JSX.Element;
  title: string;
  actions: JSX.Element[];
}

const TodosHeader: FunctionComponent<TodosHeaderProps> = ({
  title,
  icon,
  actions,
}) => {
  return (
    <header className="sticky top-0 flex h-16 w-full items-center justify-between bg-white px-4 shadow-md dark:bg-gray-800">
      <Link
        to={"/"}
        className="cursor-pointer hover:opacity-80 inline-flex items-center justify-center gap-2"
      >
        {icon}
        <p className="text-xl font-bold dark:text-gray-100">{title}</p>
      </Link>
      <div className="inline-flex items-center justify-center gap-2">
        {actions}
      </div>
    </header>
  );
};

export default TodosHeader;
export type { AppRoute };
