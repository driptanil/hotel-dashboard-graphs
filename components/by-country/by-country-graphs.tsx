"use client";

import { trpc } from "@/app/_trpc/client";
import dynamic from "next/dynamic";
const ColumnChart = dynamic(() => import("./column-chart/column-chart"), {
  ssr: false,
});

interface IByCountryGraphsProps {
  resolvedTheme: string;
}

const ByCountryGraphs: React.FunctionComponent<IByCountryGraphsProps> = ({
  resolvedTheme,
}) => {
  const { data, isLoading, error } = trpc.getBookingsByCountries.useQuery();

  if (isLoading) {
    return <section className="h-full w-full">Loading...</section>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return <ColumnChart data={data} resolvedTheme={resolvedTheme || "dark"} />;
};

export default ByCountryGraphs;
