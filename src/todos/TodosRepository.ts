import { Todo } from "./TodoItem";

class LocalTodosRepository {
  private TODO_KEYS = "todo_keys";

  constructor(protected _storage: Storage) {}

  private getKeys(): string[] {
    let keysString = this._storage.getItem(this.TODO_KEYS);
    if (keysString) {
      return JSON.parse(keysString) as string[];
    }
    return [];
  }

  private saveKey = (key: string): boolean => {
    try {
      let newKeys = [...this.getKeys(), key];
      let keysString = JSON.stringify(newKeys);
      this._storage.setItem(this.TODO_KEYS, keysString);
      return true;
    } catch (e) {
      console.error("Failed to save key.", e);
    }
    return false;
  };

  private deleteKey = (key: string) => {
    let newKeys = this.getKeys().filter((k) => k !== key);
    let keysString = JSON.stringify(newKeys);
    this._storage.setItem(this.TODO_KEYS, keysString);
  };

  saveTodo = (todo: Todo): boolean => {
    try {
      let json = JSON.stringify(todo);
      let keys = this.getKeys();
      if (!keys.includes(todo.id.toString())) {
        this.saveKey(todo.id.toString());
      }
      this._storage.setItem(todo.id.toString(), json);
      return true;
    } catch (e) {
      console.error("Failed to save todo.", e);
    }
    return false;
  };

  getTodo = (id: string): Todo | null => {
    let todoString = this._storage.getItem(id.toString());
    if (todoString) {
      let todoObj = JSON.parse(todoString);
      return {
        ...todoObj,
        date: new Date(Date.parse(todoObj.date))
      }
    }
    return null;
  };

  listTodos = (): Todo[] => {
    try {
      let keys = this.getKeys();
      let todos = keys.map((key) => this.getTodo(key));
      return todos
        .filter((value) => value !== null)
        .map((value) => value as Todo);
    } catch (e) {
      console.error("Failed to list todos.", e);
    }
    return [];
  };

  updateTodo = (todo: Todo): boolean => {
    let hasTodo = this.getTodo(todo.id.toString());
    if (hasTodo) {
      return this.saveTodo(todo);
    }
    return false;
  };

  deleteTodo = (id: string): boolean => {
    this.deleteKey(id);
    this._storage.removeItem(id.toString());
    return true;
  };
}

export default LocalTodosRepository;
