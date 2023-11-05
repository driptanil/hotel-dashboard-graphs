"use client";

import { RouterOutputs, trpc } from "@/app/_trpc/client";
import * as React from "react";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

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
  data: TByDateBookingWithTotal[];
  resolvedTheme: string;
  days: number;
}

const ByDateGraphs: React.FunctionComponent<IByDateGraphsProps> = ({
  resolvedTheme,
  data,
  days,
}) => {
  if (!data) {
    return <>NO Data</>;
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
