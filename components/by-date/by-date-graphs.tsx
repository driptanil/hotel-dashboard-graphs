"use client";

import { trpc } from "@/app/_trpc/client";
import * as React from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const TimeSeries = dynamic(() => import("./time-series/time-series"), {
  ssr: true,
});
const SparklineTemplate = dynamic(
  () => import("@/components/by-date/sparkline/sparkline-template"),
  {
    ssr: true,
  }
);

interface IByDateGraphsProps {
  resolvedTheme: string;
}

const ByDateGraphs: React.FunctionComponent<IByDateGraphsProps> = ({
  resolvedTheme,
}) => {
  const { data, isLoading, error } = trpc.getBookingsByDates.useQuery();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-1 xs:grid-cols-3 h-[150px] gap-3">
          {[1, 2, 3].map((item, index) => (
            <Card key={item} className="animate-pulse">
              <CardHeader>
                <CardDescription className="h-3 rounded w-2/3 bg-secondary/50"></CardDescription>
                <CardTitle className="h-10 rounded-md w-1/3 bg-secondary/50"></CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse h-[400px]">
          <CardHeader>
            <CardDescription className="h-4 rounded w-1/3 bg-secondary/50"></CardDescription>
            <CardTitle className="h-10 rounded-md w-1/5 bg-secondary/50"></CardTitle>
          </CardHeader>
        </Card>
      </section>
    );
  }

  const formattedData = data?.map((item) => ({
    ...item,
    total: item._sum.adults! + item._sum.children! + item._sum.babies!,
  }));

  if (!formattedData) {
    return <p>No data</p>;
  }
  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={formattedData.map((item) => item._sum.adults!)}
          label="Adults"
          dates={formattedData.map((item) => item.arrival_date)}
          days={15}
        />
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={formattedData.map((item) => item._sum.children!)}
          dates={formattedData.map((item) => item.arrival_date)}
          label="Children"
          days={15}
        />
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={formattedData.map((item) => item._sum.babies!)}
          label="Babies"
          dates={formattedData.map((item) => item.arrival_date)}
          days={15}
        />
      </div>
      <TimeSeries resolvedTheme={resolvedTheme} data={formattedData} />
    </section>
  );
};

export default ByDateGraphs;
