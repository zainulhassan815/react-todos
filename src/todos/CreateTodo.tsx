import { SaveIcon } from "@heroicons/react/outline";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Todo } from "./TodoItem";
import LocalTodosRepository from "./TodosRepository";

interface CreateTodoProps {
  repository: LocalTodosRepository;
}

const CreateTodo: FunctionComponent<CreateTodoProps> = ({ repository }) => {
  
  const navigate = useNavigate();
  const [searchParms, _] = useSearchParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let todoId = searchParms.get("todo");
    if (todoId) {
      const result = repository.getTodo(todoId);
      if (result) {
        setTodo(result);
        setTitle(result.title);
        setBody(result.body);
        setCompleted(result.completed);
      }
    }
  }, []);

  const handleCompleteChange = () => {
    setCompleted(!completed);
  };

  const saveTodo = () => {
    let newTodo: Todo = {
      id: todo?.id ?? Date.now(),
      title: title,
      body: body,
      date: new Date(),
      completed: completed,
    };
    if (todo) {
      repository.updateTodo(newTodo);
    } else {
      repository.saveTodo(newTodo);
    }
    navigate('/');
  };

  return (
    <div className="mx-auto p-4 flex justify-center gap-2 flex-col max-w-xl">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Todo Title"
        className="w-full p-4 rounded-md bg-indigo-100 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Description"
        aria-label="Todo Description"
        className="border-none max-h-64 w-full p-4 rounded-md bg-indigo-100 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 focus:ring-2"
      />
      {todo && (
        <div className="flex items-center gap-2 py-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompleteChange}
            className="rounded-md w-6 h-6 bg-white dark:bg-gray-800 border-2 active:border-indigo-500"
          />
          <p className="text-md text-black font-semibold dark:text-gray-100">
            Completed
          </p>
        </div>
      )}
      <button
        onClick={saveTodo}
        className="flex gap-2 justify-center items-center p-4 bg-indigo-500 rounded-md shadow-md text-white text-md transition-all duration-150 hover:scale-[1.02]"
      >
        <SaveIcon className="h-6 w-6" />
        <span>Save</span>
      </button>
    </div>
  );
};

export default CreateTodo;
