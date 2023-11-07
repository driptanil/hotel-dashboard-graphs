"use client";

import { RouterOutputs, trpc } from "@/app/_trpc/client";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Ghost } from "lucide-react";
const ColumnChart = dynamic(() => import("./column-chart/column-chart"), {
  ssr: true,
});

type IBookingByCountry = RouterOutputs["getBookingsByCountries"];

interface IByCountryGraphsProps {
  resolvedTheme: string;
  data: IBookingByCountry | undefined;
  isLoading?: boolean;
  days: number;
}

const ByCountryGraphs: React.FunctionComponent<IByCountryGraphsProps> = ({
  data,
  days,
  isLoading,
  resolvedTheme,
}) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse h-[400px]">
        <CardHeader>
          <CardDescription className="h-4 rounded w-1/3 bg-secondary/50"></CardDescription>
          <CardTitle className="h-10 rounded-md w-1/5 bg-secondary/50"></CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex items-center gap-4 justify-center">
        <Ghost className="" />
        No Data Found
      </div>
    );
  }

  const formattedDays = Math.round((days + 1) / 2);

  return (
    <ColumnChart
      days={formattedDays}
      data={data}
      resolvedTheme={resolvedTheme || "dark"}
    />
  );
};

export default ByCountryGraphs;
