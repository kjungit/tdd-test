"use client";
import TodoItem from "@/components/TodoItem";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import InputField from "@/components/common/InputField";
import { useState } from "react";
let todoData = [
  {
    id: 1,
    text: "12313",
    isEdit: false,
  },
  {
    id: 2,
    text: "332313211",
    isEdit: false,
  },
  {
    id: 3,
    text: "21321321",
    isEdit: false,
  },
  {
    id: 4,
    text: "123232131232113",
    isEdit: false,
  },
];
export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(todoData);

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = {
        id: Date.now(), // 간단한 고유 ID 생성
        text: todo,
        isEdit: false,
      };
      setTodos([...todos, newTodo]);
      setTodo(""); // 입력 필드 초기화
    }
  };
  const handleChange = (value: string) => {
    setTodo(value);
  };

  const onClickEdit = (id: number) => {
    const neValue = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isEdit: !item.isEdit,
        };
      }

      return item;
    });
    setTodos(neValue);
  };
  const onClickConfirm = (id: number, value: string) => {
    const neValue = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: value,
          isEdit: !item.isEdit,
        };
      }

      return item;
    });
    setTodos(neValue);
  };

  const onClickDelete = (id: number) => {
    const neValue = todos.filter((item) => item.id !== id);
    setTodos(neValue);
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
          onClick={addTodo}
        />
      </div>
      <div className="w-1/2 mt-20 flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClickConfirm={onClickConfirm}
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />
        ))}
      </div>
    </main>
  );
}
