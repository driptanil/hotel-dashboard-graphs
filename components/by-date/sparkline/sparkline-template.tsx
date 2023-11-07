"use client";

import { RouterOutputs } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Circle, Triangle } from "lucide-react";
import * as React from "react";
import ReactApexChart from "react-apexcharts";

// type TByDateBooking = RouterOutputs["getBookingsByDates"][number];

// type TByDateBookingWithTotal = TByDateBooking & { total: number };

interface ISparklineTemplateProps {
  data: number[];
  dates: string[];
  resolvedTheme: string;
  label: string;
  days: number;
}

const SparklineTemplate: React.FunctionComponent<ISparklineTemplateProps> = ({
  data,
  dates,
  label,
  days,
  resolvedTheme,
}) => {
  const totalVisitors = data.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const pastdays = data.slice(-days);

  const pastDaysTotal = pastdays.reduce((acc, item) => {
    return acc + item;
  }, 0);

  const percent =
    totalVisitors !== 0
      ? (pastDaysTotal / (totalVisitors - pastDaysTotal)) * 100
      : 0;

  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary");
  // console.log(primaryColor); // 10px

  return (
    <Card>
      <CardContent className="p-2">
        <CardHeader className="p-2">
          <CardDescription className="flex items-center justify-between">
            <div className="flex text-xs sm:text-sm items-center">
              <Triangle className="flex md:hidden w-3 h-3 mr-1" />
              <p className="hidden md:flex mr-1">Total</p>
              {label}
            </div>
            <span className="text-[0.6rem] leading-none sm:text-xs text-right">
              Last {days} days
            </span>
          </CardDescription>
          <CardTitle className="flex justify-between items-start">
            <span className="text-xl -translate-y-1 sm:translate-y-0 sm:text-2xl">
              {totalVisitors}
            </span>
            <div
              className={cn(
                "-translate-y-1.5 text-base sm:text-lg flex items-center",
                percent > 0
                  ? "dark:text-lime-400 text-green-600"
                  : percent < 0
                  ? "dark:text-rose-400 text-green-600"
                  : ""
              )}
            >
              {percent > 0 ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : percent < 0 ? (
                <ArrowDown className="w-4 h-4 mr-1" />
              ) : (
                <Circle className="w-3 h-3 mr-1" />
              )}
              {percent.toFixed(1)} %
            </div>
          </CardTitle>
        </CardHeader>
        <div className="-mt-12 -mb-10">
          <ReactApexChart
            width={"100%"}
            height={150}
            options={{
              chart: {
                type: "line",
                fontFamily: "inherit",
                foreColor: resolvedTheme === "light" ? "#000000" : "#ccc",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 2,
                  blur: 4,
                  opacity: 0.5,
                  color:
                    resolvedTheme === "light"
                      ? `hsl(${primaryColor})`
                      : `hsla(${primaryColor} / 0.5)`,
                },
                toolbar: {
                  tools: {
                    download: false,
                  },
                },
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
                enabledOnSeries: [1],
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              tooltip: {
                theme: resolvedTheme,
              },
              grid: {
                borderColor: "transparent",
                xaxis: {
                  lines: {
                    show: false,
                  },
                },
              },
              xaxis: {
                type: "category",
                categories: dates.map((item) =>
                  format(new Date(item), "do MMM yyyy")
                ),
                tickAmount: 6,
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
            }}
            series={[
              {
                name: label,
                data: data.map((item) => item),
                color: `hsla(${primaryColor})`,
              },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SparklineTemplate;
