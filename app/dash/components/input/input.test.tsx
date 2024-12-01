import { render, screen, fireEvent } from "@testing-library/react";
import Input from ".";

// Test the Input component
describe("Input Component", () => {
  it("renders the input field with the correct label", () => {
    render(
      <Input label="First name" id="first_name" placeholder="John" required />
    );

    // Check if the label is rendered correctly
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();

    // Check if the input field is in the document
    const input = screen.getByPlaceholderText(/John/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("handles input change correctly", () => {
    const handleChange = jest.fn();
    render(
      <Input
        label="First name"
        id="first_name"
        placeholder="John"
        required
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText(/John/i);

    // Simulate user input
    fireEvent.change(input, { target: { value: "Jane" } });

    // Check if the onChange function was called
    expect(handleChange).toHaveBeenCalled();
  });

  it("marks the input field as required", () => {
    render(
      <Input label="First name" id="first_name" placeholder="John" required />
    );

    const input = screen.getByPlaceholderText(/John/i);

    // Check if the input is required
    expect(input).toHaveAttribute("required");
  });
});
