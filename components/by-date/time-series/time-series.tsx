"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { RouterOutputs } from "@/app/_trpc/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { format } from "date-fns";
import CustomTooltip from "./tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactApexChart from "react-apexcharts";
import { ArrowDown, ArrowUp, Circle, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";

type TByDateBooking = RouterOutputs["getBookingsByDates"][number];

type TByDateBookingWithTotal = TByDateBooking & { total: number };

interface ITimeSeriesProps {
  data: TByDateBookingWithTotal[];
  resolvedTheme: string;
  days: number;
}

const TimeSeries: React.FunctionComponent<ITimeSeriesProps> = ({
  data,
  resolvedTheme,
  days,
}) => {
  const totalVisitors = data.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const pastdays = data.slice(-days);

  const pastDaysTotal = pastdays.reduce((acc, item) => {
    return acc + item.total;
  }, 0);

  const percent =
    totalVisitors !== 0
      ? ((totalVisitors - pastDaysTotal) / totalVisitors) * 100
      : 0;

  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary");
  // console.log(primaryColor); // 10px

  // const primaryColor = "142.1 70.6% 45.3%";

  return (
    <Card>
      <CardContent className="w-full">
        <Tabs defaultValue="apexchart">
          <CardHeader className="w-full pr-0">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-2">
                <CardDescription>
                  <div className="flex text-xs sm:text-sm items-center">
                    <Triangle className="flex sm:hidden w-3 h-3 mr-1" />
                    <p className="hidden sm:flex mr-1">Total</p>
                    Visitors
                  </div>
                </CardDescription>
                <CardTitle className="flex gap-4 items-center">
                  {totalVisitors}
                  <div
                    className={cn(
                      "text-base sm:text-lg flex items-center",
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
              </div>

              <TabsList className="">
                <TabsTrigger data-testid="rechart-line-button" value="rechart">
                  Recharts
                </TabsTrigger>
                <TabsTrigger value="apexchart">Apexcharts</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Last {days} days</CardDescription>
          </CardHeader>
          <TabsContent value="apexchart" className="-mt-7 -mb-5">
            <ReactApexChart
              width={"100%"}
              height={250}
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
                    autoSelected: "zoom",
                    tools: {
                      download: false,
                    },
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
                  labels: {
                    rotate: 0,
                  },
                  type: "category",
                  categories: data.map((item) =>
                    format(new Date(item.arrival_date), "d MMM yyyy")
                  ),
                },
              }}
              series={[
                {
                  name: "Total Visitors",
                  data: data.map((item) => item.total),
                  color: `hsl(${primaryColor})`,
                },
                {
                  name: "Adults",
                  data: data.map((item) => item._sum.adults),
                  color: `hsla(${primaryColor} / 0.3)`,
                },
                {
                  name: "Children",
                  data: data.map((item) => item._sum.children),
                  color: `hsla(${primaryColor} / 0.2)`,
                },
                {
                  name: "Babies",
                  data: data.map((item) => item._sum.babies),
                  color: `hsla(${primaryColor} / 0.1)`,
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="rechart">
            <ResponsiveContainer
              className={"min-h-[200px] w-full"}
              width="100%"
              height="100%"
            >
              <LineChart
                data-testid="rechart-line"
                width={500}
                height={200}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="arrival_date"
                  className="text-xs"
                  tickFormatter={(value) => {
                    return format(new Date(value), "do MMM yyyy");
                  }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  dataKey="total"
                  stroke={`hsl(${primaryColor})`}
                  fill={`hsl(${primaryColor})`}
                  strokeWidth={2}
                />
                <Line
                  dataKey="_sum.adults"
                  stroke={`hsla(${primaryColor} / 0.3)`}
                  fill={`hsla(${primaryColor} / 0.3)`}
                  activeDot={{ r: 2 }}
                  dot={false}
                />
                <Line
                  dataKey="_sum.children"
                  stroke={`hsla(${primaryColor} / 0.2)`}
                  fill={`hsla(${primaryColor} / 0.2)`}
                  activeDot={{ r: 2 }}
                  dot={false}
                />
                <Line
                  dataKey="_sum.babies"
                  stroke={`hsla(${primaryColor} / 0.1)`}
                  fill={`hsla(${primaryColor} / 0.1)`}
                  activeDot={{ r: 2 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TimeSeries;
