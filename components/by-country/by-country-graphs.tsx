"use client";

import { RouterOutputs, trpc } from "@/app/_trpc/client";
import dynamic from "next/dynamic";
const ColumnChart = dynamic(() => import("./column-chart/column-chart"), {
  ssr: true,
});

type IBookingByCountry = RouterOutputs["getBookingsByCountries"];

interface IByCountryGraphsProps {
  resolvedTheme: string;
  data: IBookingByCountry;
}

const ByCountryGraphs: React.FunctionComponent<IByCountryGraphsProps> = ({
  data,
  resolvedTheme,
}) => {
  return <ColumnChart data={data} resolvedTheme={resolvedTheme || "dark"} />;
};

export default ByCountryGraphs;
