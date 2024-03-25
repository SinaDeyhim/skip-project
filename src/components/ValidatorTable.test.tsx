// @ts-nocheck
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import ValidatorTable from "./ValidatorTable";
import { Chain, Validator } from "../constants";

describe("ValidatorTable component", () => {
  const validators: Validator[] = [
    {
      Name: "Validator 1",
      TotalMEVRevenue: 1000,
      TotalMEVShared: 500,
      bundles: 10,
    },
    {
      Name: "Validator 2",
      TotalMEVRevenue: 2000,
      TotalMEVShared: 1000,
      bundles: 20,
    },
  ];

  const chain: Chain = "Osmosis";

  it("renders without crashing", () => {
    render(<ValidatorTable chain={chain} validators={validators} />);
  });

  it("renders table headers correctly", () => {
    const { getByText } = render(
      <ValidatorTable chain={chain} validators={validators} />
    );
    expect(getByText("Validator")).toBeTruthy();
    expect(getByText("MEV Rev - Total")).toBeTruthy();
    expect(getByText("MEV Rev - Kept")).toBeTruthy();
    expect(getByText("Bundles")).toBeTruthy();
  });

  it("renders validators correctly", () => {
    const { getByText } = render(
      <ValidatorTable chain={chain} validators={validators} />
    );
    expect(getByText("Validator 1")).toBeTruthy();
    expect(getByText("Validator 2")).toBeTruthy();
  });

  it("filters validators correctly", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <ValidatorTable chain={chain} validators={validators} />
    );
    const filterInput = getByPlaceholderText("Filter");
    fireEvent.change(filterInput, { target: { value: "Validator 1" } });
    expect(getByText("Validator 1")).toBeTruthy();
    expect(queryByText("Validator 2")).toBeNull();
  });

  it("sorts validators correctly", async () => {
    const chain = "Osmosis";
    const validators = [
      {
        Name: "Validator 1",
        TotalMEVRevenue: 200,
        TotalMEVShared: 150,
        bundles: 10,
      },
      {
        Name: "Validator 2",
        TotalMEVRevenue: 100,
        TotalMEVShared: 50,
        bundles: 5,
      },
    ];

    const { getByText, getAllByRole } = render(
      <ValidatorTable chain={chain} validators={validators} />
    );

    // Click on the "Validator" column header to sort
    await act(async () => fireEvent.click(getByText("Validator")));

    const validatorRows = getAllByRole("row").slice(1); // Skip the header row
    const sortedValidatorNames = validatorRows.map(
      (row) => row.cells[1].textContent // Accessing the text content of the second cell (Validator name)
    );

    // Ensure that the validators are sorted in ascending order based on their names
    await waitFor(() => {
      expect(sortedValidatorNames).toEqual(["Validator 1", "Validator 2"]);
    });
  });
});
