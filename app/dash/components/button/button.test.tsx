import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from ".";

describe("Button Component", () => {
  it("renders a button with the correct label", () => {
    render(<Button label="Default" />);
    const button = screen.getByText("Default");
    expect(button).toBeInTheDocument();
  });

  it("check button variant", () => {
    render(<Button label="Primary"/>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass(
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    );
  });

  it("handles button clicks correctly", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a button with the correct type", () => {
    render(<Button label="Submit" type="submit" />);
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});