/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("메인페이지를 로드하고 기본 요소들을 렌더링한다.", () => {
    render(<Home />);

    expect(
      screen.getByPlaceholderText("메모를 작성해주세요.")
    ).toBeInTheDocument();
    expect(screen.getByText("등록")).toBeInTheDocument();
    expect(screen.getAllByText("수정").length).toBe(4);
    expect(screen.getAllByText("삭제").length).toBe(4);
  });

  it("todo 항목을 수정한다.", () => {
    render(<Home />);

    // 첫 번째 '수정' 버튼 클릭
    fireEvent.click(screen.getAllByText("수정")[0]);

    // 입력 필드가 나타나는지 확인
    const inputField =
      screen.getAllByPlaceholderText("메모를 작성해주세요.")[1];
    expect(inputField).toBeInTheDocument();

    // 입력 필드의 값을 변경
    fireEvent.change(inputField, { target: { value: "수정된 할 일" } });

    // '확인' 버튼 클릭
    fireEvent.click(screen.getByText("확인"));

    // 수정된 텍스트가 표시되는지 확인
    expect(screen.getByText("수정된 할 일")).toBeInTheDocument();
  });

  it("todo 항목을 삭제한다.", () => {
    render(<Home />);

    // 삭제 전 todo 항목 개수 확인
    const initialTodoCount = screen.getAllByText("삭제").length;

    // 첫 번째 '삭제' 버튼 클릭
    fireEvent.click(screen.getAllByText("삭제")[0]);

    // 삭제 후 todo 항목 개수 확인
    const finalTodoCount = screen.getAllByText("삭제").length;

    expect(finalTodoCount).toBe(initialTodoCount - 1);
  });

  it("새로운 todo를 추가한다.", () => {
    render(<Home />);

    // 입력 필드에 새 todo 입력
    const inputField = screen.getByPlaceholderText("메모를 작성해주세요.");
    fireEvent.change(inputField, { target: { value: "새로운 할 일" } });

    // '등록' 버튼 클릭
    fireEvent.click(screen.getByText("등록"));

    // 새 todo가 목록에 추가되었는지 확인
    expect(screen.getByText("새로운 할 일")).toBeInTheDocument();
  });
});
