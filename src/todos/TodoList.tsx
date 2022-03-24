import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "./SearchField";
import TodoItem, { Todo } from "./TodoItem";
import LocalTodosRepository from "./TodosRepository";

const sampleTodos: Todo[] = [
  {
    id: 0,
    title: "What is Lorem Ipsum?",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    date: new Date("22 March 2022"),
    completed: false,
  },
  {
    id: 1,
    title: "What is Lorem Ipsum 1?",
    body: "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    date: new Date("20 March 2022"),
    completed: false,
  },
  {
    id: 2,
    title: "What is Lorem Ipsum 2?",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: new Date("21 March 2022"),
    completed: true,
  },
];

interface TodoListProps {
  repository: LocalTodosRepository;
}

const TodoList: FunctionComponent<TodoListProps> = ({ repository }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosBackup, setTodosBackup] = useState<Todo[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let result = repository.listTodos();
    setTodos(result);
    setTodosBackup(result);
  }, [location]);

  function filterTodos(query: string) {
    if (query.trim().replaceAll(" ", "").length > 0) {
      let lowecaseQuery = query.toLocaleLowerCase();
      let filteredTodos = todosBackup.filter(
        (todo) =>
          todo.title.toLocaleLowerCase().includes(lowecaseQuery) ||
          todo.body.toLocaleLowerCase().includes(lowecaseQuery)
      );
      setTodos(filteredTodos);
    } else {
      setTodos(todosBackup);
    }
  }

  function deleteTodo(todo: Todo) {
    let deleted = repository.deleteTodo(todo.id.toString());
    if (deleted) {
      const newTodos = todos.filter((t) => t !== todo);
      setTodos(newTodos);
      setTodosBackup(newTodos);
    }
  }

  function completeTodo(todo: Todo) {
    const updatedTodos = [...todos];
    let updatedTodo: Todo = {
      id: todo.id,
      title: todo.title,
      body: todo.body,
      date: todo.date,
      completed: !todo.completed,
    };
    let isUpdated = repository.updateTodo(updatedTodo);
    if (isUpdated) {
      updatedTodos.splice(todos.indexOf(todo), 1, updatedTodo);
      setTodos(updatedTodos);
      setTodosBackup(updatedTodos);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4 dark:bg-gray-900">
      <SearchField onChange={filterTodos} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            onClick={() => navigate(`/create?todo=${todo.id}`)}
            todo={todo}
            onDeleteClick={() => deleteTodo(todo)}
            onCompleteClick={() => completeTodo(todo)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
