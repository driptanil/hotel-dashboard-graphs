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
import { Loader } from "lucide-react";

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

  // console.log("Loading first date: ", loadingFirstDate);
  // console.log("Loading last date: ", loadingLastDate);

  if (loadingFirstDate || loadingLastDate) {
    return (
      <div className="min-h-screen animate-pulse flex gap-4 text-xl items-center justify-center">
        <Loader className="w-7 h-7 animate-spin" /> Loading
      </div>
    );
  }

  if (!firstDate) {
    return <p>Something went wrong</p>;
  }
  if (!lastDate) {
    return <p>Something went wrong</p>;
  }

  return (
    <main
      data-testid="mainPage"
      className="min-h-screen w-full max-w-7xl mx-auto flex flex-col gap-5 p-10"
    >
      {/* <h1>Date Range</h1> */}
      <DatePickerForm from={firstDate} to={lastDate} />
    </main>
  );
};

export default MainPage;
