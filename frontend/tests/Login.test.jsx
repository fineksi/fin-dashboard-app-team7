import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../src/pages/Login";

describe("Login Component", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("renders correctly with initial elements", () => {
    render(<Login />);

    expect(
      screen.getByRole("heading", { name: /Selamat Datang di Fineksi/i })
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/masukkan email anda/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/masukkan password anda/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays an error if email is empty on submit", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/masukkan password anda/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("displays an error if email format is invalid", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/masukkan email anda/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/masukkan password anda/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("displays an error if password is empty", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/masukkan email anda/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("toggles the password visibility when button is clicked", () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(/masukkan password anda/i);
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("submits the form when fields are valid", () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/masukkan email anda/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/masukkan password anda/i), {
      target: { value: "validPass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(consoleSpy).toHaveBeenCalledWith("Login successful:", {
      email: "test@example.com",
      password: "validPass123",
    });
  });
  
  it("changes button background color on hover", () => {
    render(<Login />);
    
    const loginButton = screen.getByRole("button", { name: /login/i });
  
    // Simulate mouse over
    fireEvent.mouseOver(loginButton);
    expect(loginButton).toHaveStyle("background-color: #2448E3");
  
    // Simulate mouse out
    fireEvent.mouseOut(loginButton);
    expect(loginButton).toHaveStyle("background-color: #2F52FD");
  });
  

});
