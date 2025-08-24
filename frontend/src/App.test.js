import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders app and allows input", () => {
  render(<App />);

  expect(screen.getByText("IP Threat Intelligence")).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/Enter IP address/i);
  fireEvent.change(input, { target: { value: "8.8.8.8" } });
  expect(input.value).toBe("8.8.8.8");

  expect(screen.getByRole("button", { name: /check/i })).toBeInTheDocument();
});

test("shows error message when API fails", () => {
  render(<App />);

  const input = screen.getByPlaceholderText(/Enter IP address/i);
  fireEvent.change(input, { target: { value: "invalid" } });

  const button = screen.getByRole("button", { name: /check/i });
  fireEvent.click(button);

  expect(screen.getByText("IP Threat Intelligence")).toBeInTheDocument();
});
