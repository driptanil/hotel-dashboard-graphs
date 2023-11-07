import React from "react";
import { render, screen } from "@testing-library/react";
import { dateDiffInDays } from "@/lib/utils";
import ByDateGraphs from "../by-date-graphs";

const mockData = [
  {
    _sum: {
      adults: 84,
      children: 7,
      babies: 0,
    },
    arrival_date: "2015-07-24T18:30:00.000Z",
    total: 91,
  },
  {
    _sum: {
      adults: 31,
      children: 4,
      babies: 0,
    },
    arrival_date: "2015-07-25T18:30:00.000Z",
    total: 35,
  },
  {
    _sum: {
      adults: 76,
      children: 6,
      babies: 0,
    },
    arrival_date: "2015-07-26T18:30:00.000Z",
    total: 82,
  },
];

const mockDays = dateDiffInDays(
  new Date(mockData[mockData.length - 1].arrival_date),
  new Date(mockData[0].arrival_date)
);

describe("By Date Graphs", () => {
  it("loading state", () => {
    render(
      <ByDateGraphs
        resolvedTheme="dark"
        isLoading={true}
        data={mockData}
        days={mockDays}
      />
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("no data", () => {
    render(
      <ByDateGraphs resolvedTheme="dark" data={undefined} days={mockDays} />
    );
    expect(screen.getByTestId("no-data")).toBeInTheDocument();
  });
});
