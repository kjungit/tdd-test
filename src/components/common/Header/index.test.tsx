/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Header from ".";

it("App Router: Works with Server Components", () => {
  render(<Header />);
  expect(screen.getByText("TodoList")).toBeInTheDocument();
});
