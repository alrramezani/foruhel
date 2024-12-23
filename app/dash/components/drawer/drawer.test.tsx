import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Drawer from "./index";

describe("Drawer Component", () => {
  test("renders children when isOpen is true", () => {
    render(
      <Drawer isOpen={true} toggle={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("does not render children when isOpen is false", () => {
    render(
      <Drawer isOpen={false} toggle={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("calls toggle function when overlay is clicked", () => {
    const mockToggle = jest.fn();
    render(
      <Drawer isOpen={true} toggle={mockToggle}>
        <div>Test Content</div>
      </Drawer>
    );

    const overlay = screen.getByRole("presentation");
    fireEvent.click(overlay);

    expect(mockToggle).toHaveBeenCalled();
  });

  test("calls toggle function when the close icon is clicked", () => {
    const mockToggle = jest.fn();
    render(
      <Drawer isOpen={true} toggle={mockToggle}>
        <div>Test Content</div>
      </Drawer>
    );

    const closeIcon = screen.getByRole("close_button");
    fireEvent.click(closeIcon);

    expect(mockToggle).toHaveBeenCalled();
  });

  test("drawer has correct classes when isOpen is true", () => {
    render(
      <Drawer isOpen={true} toggle={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );

    const drawer = screen.getByTestId("drawer");
    expect(drawer).toHaveClass("translate-x-0");
  });

  test("drawer has correct classes when isOpen is false", () => {
    render(
      <Drawer isOpen={false} toggle={jest.fn()}>
        <div>Test Content</div>
      </Drawer>
    );

    const drawer = screen.getByTestId("drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });
});