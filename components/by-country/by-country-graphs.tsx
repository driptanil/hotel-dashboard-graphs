"use client";

// type import
import { RouterOutputs } from "@/app/_trpc/client";

// component import
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

// icon import
import { Ghost } from "lucide-react";

// dynamic import
import dynamic from "next/dynamic";
const ColumnChart = dynamic(() => import("./column-chart/column-chart"), {
  ssr: true,
});

type IBookingByCountry = RouterOutputs["getBookingsByCountries"];

interface IByCountryGraphsProps {
  resolvedTheme: string;
  data: IBookingByCountry | undefined;
  isLoading?: boolean;
}

const ByCountryGraphs: React.FunctionComponent<IByCountryGraphsProps> = ({
  data,
  isLoading,
  resolvedTheme,
}) => {
  // loading state for the data
  if (isLoading) {
    return (
      <Card data-testid="loading" className="animate-pulse h-[400px]">
        <CardHeader>
          <CardDescription className="h-4 rounded w-1/3 bg-secondary/50"></CardDescription>
          <CardTitle className="h-10 rounded-md w-1/5 bg-secondary/50"></CardTitle>
        </CardHeader>
      </Card>
    );
  }
  // no data is found in the database
  if (!data) {
    return (
      <div
        data-testid="no-data"
        className="w-full flex items-center gap-4 justify-center"
      >
        <Ghost className="" />
        No Data Found
      </div>
    );
  }

  return <ColumnChart data={data} resolvedTheme={resolvedTheme || "dark"} />;
};

export default ByCountryGraphs;
