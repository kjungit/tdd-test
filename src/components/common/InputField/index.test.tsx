/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from ".";

describe("InputField Component", () => {
  it("input 컴포넌트가 렌더링 된다.", () => {
    render(
      <InputField
        cyId=""
        placeholder="Enter text"
        name="input"
        value="test"
        onChange={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "input");
    expect(inputElement).toHaveValue("test");
  });

  it("입력값 변경 시 onChange가 호출된다", () => {
    const handleChange = jest.fn();
    render(
      <InputField
        cyId=""
        placeholder="Enter text"
        name="input"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("new value");
  });
});
