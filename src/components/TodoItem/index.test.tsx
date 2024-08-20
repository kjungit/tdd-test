import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoItem from ".";

describe("TodoItem", () => {
  const mockTodo = {
    id: "1",
    text: "테스트 할 일",
    isEdit: false,
  };

  const mockOnClickEdit = jest.fn();
  const mockOnClickConfirm = jest.fn();
  const mockOnClickDelete = jest.fn();

  it("todoItem 컴포넌트를 렌더링 합니다.", () => {
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

  it("todoItem 수정시 편집모드로 input이 나타나게 합니다.", () => {
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

  it("TodoItem 수정 버튼 클릭이 동작되는지 확인합니다.", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    fireEvent.click(screen.getByText("수정"));
    expect(mockOnClickEdit).toHaveBeenCalledWith("1");
  });

  it("TodoItem 삭제 버튼 클릭이 동작되는지 확인합니다.", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onClickEdit={mockOnClickEdit}
        onClickConfirm={mockOnClickConfirm}
        onClickDelete={mockOnClickDelete}
      />
    );

    fireEvent.click(screen.getByText("삭제"));
    expect(mockOnClickDelete).toHaveBeenCalledWith("1");
  });

  it("Todoitem 수정버튼 클릭후 todo 수정 후 확인 버튼을 클릭했을 때 수정이 되는지 확인합니다.", () => {
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

    expect(mockOnClickConfirm).toHaveBeenCalledWith("1", "수정된 할 일");
  });
});
