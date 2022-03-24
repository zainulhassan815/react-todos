import { ClipboardCheckIcon, PlusIcon } from "@heroicons/react/outline";
import { Route, Routes, useLocation } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import CreateTodo from "../todos/CreateTodo";
import TodoList from "../todos/TodoList";
import LocalTodosRepository from "../todos/TodosRepository";
import TodosHeader, { AppRoute } from "./Header";

const routes: AppRoute[] = [
  {
    name: "Create Todo",
    path: "/create",
    icon: <PlusIcon className="h-4 w-4" />,
  },
];
const repository = new LocalTodosRepository(localStorage);

function App() {

  const location = useLocation();
  
  return (
    <div className="h-screen w-full dark:bg-gray-900">
      <TodosHeader
        icon={<ClipboardCheckIcon className="h-8 w-8 text-indigo-500" />}
        title="Todos"
        actions={routes.map((route) => (
          <LinkButton
            disabled={location.pathname.includes("create")}
            key={route.name}
            location={route}
          />
        ))}
      />
      <Routes>
        <Route path="/" element={<TodoList repository={repository} />} />
        <Route
          path="/create"
          element={<CreateTodo repository={repository} />}
        />
      </Routes>
    </div>
  );
}

export default App;
