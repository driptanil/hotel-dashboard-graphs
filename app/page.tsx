"use client";

import React from "react";
import { trpc } from "./_trpc/client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePickerForm from "@/components/forms/date-range-form";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const {
    data: firstDate,
    isLoading: loadingFirstDate,
    error: firstDateError,
  } = trpc.getFirstDate.useQuery();

  const {
    data: lastDate,
    isLoading: loadingLastDate,
    error: lastDateError,
  } = trpc.getLastDate.useQuery();

  // const { data, isLoading, error } = trpc.getBookingsByDates.useQuery();

  if (loadingFirstDate || loadingLastDate) {
    return <></>;
  }

  // const formattedData = data?.map((item) => ({
  //   ...item,
  //   total: item._sum.adults! + item._sum.children! + item._sum.babies!,
  // }));

  // if (!formattedData) {
  //   return <p>No data</p>;
  // }

  if (!firstDate) {
    return <p>Something went wrong</p>;
  }
  if (!lastDate) {
    return <p>Something went wrong</p>;
  }
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto flex flex-col gap-5 p-10">
      <DatePickerForm from={firstDate} to={lastDate} />
      {/* <ByDateGraphs
        data={formattedData}
        resolvedTheme={resolvedTheme || "dark"}
      />
      <ByCountryGraphs resolvedTheme={resolvedTheme || "dark"} /> */}
    </main>
  );
};

export default MainPage;
