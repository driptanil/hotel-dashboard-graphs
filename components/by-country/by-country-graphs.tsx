"use client";

import { trpc } from "@/app/_trpc/client";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
const ColumnChart = dynamic(() => import("./column-chart/column-chart"), {
  ssr: true,
});

interface IByCountryGraphsProps {
  resolvedTheme: string;
}

const ByCountryGraphs: React.FunctionComponent<IByCountryGraphsProps> = ({
  resolvedTheme,
}) => {
  const { data, isLoading, error } = trpc.getBookingsByCountries.useQuery();

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
    return <p>No data</p>;
  }

  return <ColumnChart data={data} resolvedTheme={resolvedTheme || "dark"} />;
};

export default ByCountryGraphs;
