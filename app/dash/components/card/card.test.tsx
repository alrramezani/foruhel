import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    // Ensure the child content is inside the Card
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    const { container } = render(
      <Card>
        <p>Styled Card</p>
      </Card>
    );

    // Check if the card has the expected Tailwind classes
    expect(container.firstChild).toHaveClass(
      "w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    );
  });
});