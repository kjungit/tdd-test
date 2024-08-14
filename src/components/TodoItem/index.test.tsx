import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoItem from ".";

describe("TodoItem", () => {
  const mockTodo = {
    id: 1,
    text: "테스트 할 일",
    isEdit: false,
  };

  const mockOnClickEdit = jest.fn();
  const mockOnClickConfirm = jest.fn();
  const mockOnClickDelete = jest.fn();

  it("renders todo text when not in edit mode", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    expect(screen.getByText("테스트 할 일")).toBeInTheDocument();
  });

  it("renders input field when in edit mode", () => {
    const editModeTodo = { ...mockTodo, isEdit: true };
    render(
      <TodoItem
        todo={editModeTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    expect(
      screen.getByPlaceholderText("메모를 작성해주세요.")
    ).toBeInTheDocument();
  });

  it("calls onClickEdit when edit button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    fireEvent.click(screen.getByText("수정"));
    expect(mockOnClickEdit).toHaveBeenCalledWith(1);
  });

  it("calls onClickDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    fireEvent.click(screen.getByText("삭제"));
    expect(mockOnClickDelete).toHaveBeenCalledWith(1);
  });

  it("calls onClickConfirm with updated value when confirm button is clicked in edit mode", () => {
    const editModeTodo = { ...mockTodo, isEdit: true };
    render(
      <TodoItem
        todo={editModeTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    const input = screen.getByPlaceholderText("메모를 작성해주세요.");
    fireEvent.change(input, { target: { value: "수정된 할 일" } });
    fireEvent.click(screen.getByText("확인"));

    expect(mockOnClickConfirm).toHaveBeenCalledWith(1, "수정된 할 일");
  });
});
