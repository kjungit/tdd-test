import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  text: string;
  isEdit: boolean;
}

export function useTodos(initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string) => {
    if (text.trim() !== "") {
      const newTodo: Todo = {
        id: uuidv4(),
        text,
        isEdit: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const editTodo = (id: string) => {
    const editTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
    );
    setTodos(editTodos);
  };

  const confirmEdit = (id: string, newText: string) => {
    const confirmTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, isEdit: false } : todo
    );
    setTodos(confirmTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, editTodo, confirmEdit, deleteTodo };
}
