import { render, screen, waitFor } from "@testing-library/react";
import MainPage from "@/app/page";
import { trpc } from "../_trpc/client";
import TRPCProvider from "@/providers/tRPCProvider";

describe("DatePickerForm", () => {
  it("should render successfully", () => {
    jest.spyOn(trpc, "useQueries");

    render(
      <TRPCProvider>
        <MainPage />
      </TRPCProvider>
    );

    // Use await to wait for the promise to resolve
    const datePickerForm = screen.findByTestId("DatePickerForm");

    expect(datePickerForm).resolves.toBeInTheDocument();
  });
});
