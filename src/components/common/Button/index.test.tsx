/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button Component", () => {
  it("기본 props(size, color)가 적용된다.", () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "bg-white text-black hover:bg-gray-300 w-14 h-10 rounded-md"
    );
  });

  it("버튼의 label값이 적용되어 렌더링 된다.", () => {
    render(<Button label="Submit" />);
    const buttonElement = screen.getByRole("button", {
      name: "Submit",
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("버튼의 size props별(sm, md, lg)값이 적용되어 렌더링 된다.", () => {
    render(<Button label="Small" size="sm" />);
    let buttonElement = screen.getByRole("button", {
      name: "Small",
    });
    expect(buttonElement).toHaveClass("w-14 h-10 rounded-md");

    render(<Button label="Medium" size="md" />);
    buttonElement = screen.getByRole("button", {
      name: "Medium",
    });
    expect(buttonElement).toHaveClass("w-16 h-12 rounded-md");

    render(<Button label="Large" size="lg" />);
    buttonElement = screen.getByRole("button", {
      name: "Large",
    });
    expect(buttonElement).toHaveClass("w-20 h-14 rounded-lg");
  });

  it("버튼의 color props(white, gray)가 적용되어 렌더링 된다.", () => {
    render(<Button label="White Button" color="white" />);
    let buttonElement = screen.getByRole("button", {
      name: "White Button",
    });
    expect(buttonElement).toHaveClass("bg-white text-black hover:bg-gray-300");

    render(<Button label="Gray Button" color="gray" />);
    buttonElement = screen.getByRole("button", {
      name: "Gray Button",
    });
    expect(buttonElement).toHaveClass(
      "bg-yellow-600 text-white hover:bg-yellow-700"
    );
  });

  it("버튼을 클릭하면 onClick 이벤트가 호출된다.", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", {
      name: "Click me",
    });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
