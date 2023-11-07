import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { dateDiffInDays } from "@/lib/utils";
import ByCountryGraphs from "../by-country-graphs";
import dynamic from "next/dynamic";
const ColumnChart = dynamic(() => import("../column-chart/column-chart"), {
  ssr: true,
});

const mockData = [
  {
    _sum: {
      adults: 2,
      children: 0,
      babies: 0,
    },
    country: "CN",
  },
  {
    _sum: {
      adults: 16,
      children: 3,
      babies: 0,
    },
    country: "ESP",
  },
  {
    _sum: {
      adults: 9,
      children: 0,
      babies: 0,
    },
    country: "GBR",
  },
];

describe("By Country graphs", () => {
  it("loading state", () => {
    render(
      <ByCountryGraphs resolvedTheme="dark" isLoading={true} data={mockData} />
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("no data", () => {
    render(<ByCountryGraphs resolvedTheme="dark" data={undefined} />);
    expect(screen.getByTestId("no-data")).toBeInTheDocument();
  });
});
