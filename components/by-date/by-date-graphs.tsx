"use client";

import { RouterOutputs, trpc } from "@/app/_trpc/client";
import * as React from "react";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Ghost } from "lucide-react";

const TimeSeries = dynamic(() => import("./time-series/time-series"), {
  ssr: true,
});
const SparklineTemplate = dynamic(
  () => import("@/components/by-date/sparkline/sparkline-template"),
  {
    ssr: true,
  }
);

type TByDateBooking = RouterOutputs["getBookingsByDates"][number];

type TByDateBookingWithTotal = TByDateBooking & { total: number };

interface IByDateGraphsProps {
  data: TByDateBookingWithTotal[] | undefined;
  resolvedTheme: string;
  days: number;
  isLoading?: boolean;
}

const ByDateGraphs: React.FunctionComponent<IByDateGraphsProps> = ({
  resolvedTheme,
  data,
  days,
  isLoading,
}) => {
  if (isLoading) {
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
    </section>;
  }

  if (!data || !days) {
    return (
      <div className="w-full flex items-center gap-4 justify-center">
        <Ghost className="" />
        No Data Found
      </div>
    );
  }

  const formattedDays = Math.round((days + 1) / 2);

  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={data.map((item) => item._sum.adults!)}
          label="Adults"
          dates={data.map((item) => item.arrival_date)}
          days={formattedDays}
        />
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={data.map((item) => item._sum.children!)}
          dates={data.map((item) => item.arrival_date)}
          label="Children"
          days={formattedDays}
        />
        <SparklineTemplate
          resolvedTheme={resolvedTheme || "dark"}
          data={data.map((item) => item._sum.babies!)}
          label="Babies"
          dates={data.map((item) => item.arrival_date)}
          days={formattedDays}
        />
      </div>
      <TimeSeries
        resolvedTheme={resolvedTheme}
        data={data}
        days={formattedDays}
      />
    </section>
  );
};

export default ByDateGraphs;
