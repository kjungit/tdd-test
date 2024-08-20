"use client";
import TodoItem from "@/components/TodoItem";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import InputField from "@/components/common/InputField";
import { useTodos } from "@/hooks/useTodos";
import { useState } from "react";
const todoData = [
  {
    id: "1",
    text: "12313",
    isEdit: false,
  },
  {
    id: "2",
    text: "332313211",
    isEdit: false,
  },
  {
    id: "3",
    text: "21321321",
    isEdit: false,
  },
  {
    id: "4",
    text: "123232131232113",
    isEdit: false,
  },
];
export default function Home() {
  const [todo, setTodo] = useState("");
  const { todos, addTodo, editTodo, confirmEdit, deleteTodo } =
    useTodos(todoData);

  const handleChange = (value: string) => {
    setTodo(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center  px-24">
      <Header />
      <div className="flex gap-4">
        <InputField
          cyId="todo-input"
          placeholder="메모를 작성해주세요."
          name="todo"
          value={todo}
          onChange={handleChange}
          className="w-60 h-10 border-2 bg-black p-2"
        />
        <Button
          cyId="add-todo-button"
          size="sm"
          color="white"
          label="등록"
          onClick={() => addTodo(todo)}
        />
      </div>
      <div className="w-1/2 mt-20 flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClickConfirm={confirmEdit}
            onClickDelete={deleteTodo}
            onClickEdit={editTodo}
          />
        ))}
      </div>
    </main>
  );
}
