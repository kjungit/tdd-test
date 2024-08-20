/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Header from ".";

describe("Header Component", () => {
  it("'TDD ToDoList'라는 제목을 표시해야 합니다", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", {
      name: "TDD TodoList",
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
  it("로그인 버튼이 표시되야 합니다.", () => {
    render(<Header />);

    const loginButton = screen.getByRole("button", {
      name: "로그인",
    });

    expect(loginButton).toBeInTheDocument();
  });
});
