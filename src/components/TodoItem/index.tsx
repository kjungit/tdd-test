import React, { useState } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    isEdit: boolean;
  };
  onClickEdit: (id: number) => void;
  onClickConfirm: (id: number, value: string) => void;
  onClickDelete: (id: number) => void;
}
export default function TodoItem({
  todo,
  onClickEdit,
  onClickConfirm,
  onClickDelete,
}: TodoItemProps) {
  const { id, text, isEdit } = todo;
  const [value, setValue] = useState(text);

  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <div
      data-cy={`todo-item-${todo.id}`}
      className="w-full h-12 border flex gap-4 items-center p-4 justify-between"
    >
      {isEdit ? (
        <InputField
          cyId={`edit-input-${todo.id}`}
          placeholder="메모를 작성해주세요."
          name="todo"
          value={value}
          onChange={handleChange}
          className="bg-black w-full"
        />
      ) : (
        <p>{text}</p>
      )}
      {isEdit ? (
        <div className="flex gap-4">
          <Button
            cyId={`cancel-button-${todo.id}`}
            label="취소"
            size="xs"
            onClick={() => {
              setValue(text);
              onClickEdit(id);
            }}
          />
          <Button
            cyId={`confirm-button-${todo.id}`}
            label="확인"
            size="xs"
            onClick={() => onClickConfirm(id, value)}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            cyId={`edit-button-${todo.id}`}
            size="sm"
            color="white"
            label="수정"
            onClick={() => onClickEdit(todo.id)}
          />
          <Button
            cyId={`delete-button-${todo.id}`}
            size="sm"
            color="white"
            label="삭제"
            onClick={() => onClickDelete(todo.id)}
          />
        </div>
      )}
    </div>
  );
}
