import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { CheckCircleIcon as FilledCheckCircleIcon } from "@heroicons/react/solid";
import { FunctionComponent, useEffect } from "react";
import IconButton from "../components/IconButton";

interface Todo {
  id: number;
  title: string;
  body: string;
  date: Date;
  completed: boolean;
}

const EMPTY_TODO: Todo = {
  id: -1,
  title: "",
  body: "",
  date: new Date(),
  completed: false,
};

function isEmpty(todo: Todo): boolean {
  return todo === EMPTY_TODO;
}

interface TodoItemProps {
  todo: Todo;
  onClick?: () => void;
  onDeleteClick?: () => void;
  onCompleteClick?: () => void;
}

const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo,
  onClick,
  onDeleteClick,
  onCompleteClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-2 rounded-md bg-indigo-50 p-3 shadow-md transition-all duration-150 hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-indigo-300 dark:bg-gray-800"
    >
      <p className="bold text-xl text-black dark:text-gray-100">{todo.title}</p>
      <p className="text-md text-gray-800 dark:text-gray-300">{todo.body}</p>
      <div className="mt-auto flex items-center justify-between">
        <p className="bold text-sm text-gray-500">{todo.date.toDateString()}</p>
        <div className="inline-flex items-center justify-center gap-2 place-self-end">
          {/* Complete Todo Button */}
          <IconButton
            onClick={(e) => {
              onCompleteClick?.();
              e.stopPropagation();
            }}
            icon={
              todo.completed ? (
                <FilledCheckCircleIcon className="h-6 w-6" />
              ) : (
                <CheckCircleIcon className="h-6 w-6" />
              )
            }
            styleOverrides="text-emerald-500 bg-emerald-100 hover:bg-emerald-500"
          />

          {/* Delete Todo Buttton */}
          <IconButton
            onClick={(e) => {
              onDeleteClick?.();
              e.stopPropagation();
            }}
            icon={<TrashIcon className="h-6 w-6" />}
            styleOverrides="text-red-500 bg-red-100 hover:bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
export type { Todo };
export { EMPTY_TODO, isEmpty };
