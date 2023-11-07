"use client";

// type import
import { RouterOutputs } from "@/app/_trpc/client";

// component import
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// graph imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./recharts-tooltip";
import ReactApexChart from "react-apexcharts";

// util import
import { countryNames, getFlagEmoji } from "@/lib/utils";

type TByCountryBooking = RouterOutputs["getBookingsByCountries"][number];

interface IColumnChartProps {
  data: TByCountryBooking[];
  resolvedTheme: string;
}

const ColumnChart: React.FunctionComponent<IColumnChartProps> = ({
  resolvedTheme,
  data,
}) => {
  // calculating total visitors by adding adults, children and babies
  const formattedData = data.map((item) => ({
    ...item,
    total: item._sum.adults! + item._sum.children! + item._sum.babies!,
  }));

  // getting value of css variable "--primary"
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary");

  return (
    <Card>
      <CardContent className="w-full">
        <Tabs defaultValue="apexchart">
          <CardHeader className="w-full pr-0">
            <div className="flex flex-col xs:flex-row justify-between xs:items-center w-full gap-3">
              <div className="flex flex-col gap-2">
                <CardDescription>Total Countries</CardDescription>
                <CardTitle className="flex gap-4 items-center">
                  {data.length}
                </CardTitle>
                <CardDescription>All countries</CardDescription>
              </div>
              <TabsList className="w-fit">
                <TabsTrigger value="rechart">Recharts</TabsTrigger>
                <TabsTrigger value="apexchart">Apexcharts</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <TabsContent value="apexchart" className="-mt-7 -mb-5">
            <ReactApexChart
              data-testid="apexchart"
              type="bar"
              height={250}
              options={{
                chart: {
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
                  stacked: true,
                },
                dataLabels: {
                  enabled: false,
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
                  categories: formattedData.map(
                    (item) =>
                      `${countryNames(
                        item.country.substring(0, 2)
                      )} ${getFlagEmoji(item.country)}`
                  ),
                  tickAmount: 6,
                },
              }}
              series={[
                {
                  name: "Visitors",
                  data: formattedData.map((item) => item._sum.adults),
                  color: `hsla(${primaryColor})`,
                },
              ]}
            />
          </TabsContent>
          <TabsContent value="rechart">
            <ResponsiveContainer
              className="min-h-[200px] w-full"
              width="100%"
              height="100%"
            >
              <BarChart
                data-testid="rechart"
                width={500}
                height={250}
                data={formattedData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="country" className="text-xs" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="_sum.adults"
                  stackId={"_sum"}
                  stroke={`hsl(${primaryColor})`}
                  fill={`hsl(${primaryColor})`}
                />
                <Bar
                  dataKey="_sum.children"
                  stackId={"_sum"}
                  stroke={`hsl(${primaryColor})`}
                  fill={`hsl(${primaryColor})`}
                />
                <Bar
                  dataKey="_sum.babies"
                  stackId={"_sum"}
                  stroke={`hsl(${primaryColor})`}
                  fill={`hsl(${primaryColor})`}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ColumnChart;
