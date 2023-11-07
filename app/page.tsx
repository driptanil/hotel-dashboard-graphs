"use client";

import React from "react";

// backend import
import { trpc } from "./_trpc/client";

// component import
import DatePickerForm from "@/components/forms/date-range-form";

// icon import
import { Calendar, Loader, XCircle } from "lucide-react";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  // fetch starting and ending dates of sample data from backend,
  // so that we can set dates out of this range as disabled in the calendar
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

  // loading state
  if (loadingFirstDate || loadingLastDate) {
    return (
      <div className="min-h-screen animate-pulse flex gap-4 text-xl items-center justify-center">
        <Loader className="w-7 h-7 animate-spin" /> Loading
      </div>
    );
  }

  // first date is not available
  if (!firstDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="flex text-2xl text-rose-500 font-semibold gap-5 items-center">
          <XCircle className="w-10 h-10 " />
          <div>
            <p>Error</p>
            <p className="text-base">{firstDateError?.message}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-lg">
          <Calendar className="w-6 h-6" />
          Unable to fetch starting date of sample data
        </div>
      </div>
    );
  }

  // last date is not available
  if (!lastDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="flex text-2xl text-rose-500 font-semibold gap-5 items-center">
          <XCircle className="w-10 h-10 " />
          <div>
            <p>Error</p>
            <p className="text-base">{lastDateError?.message}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-lg">
          <Calendar className="w-6 h-6" />
          Unable to fetch ending date of sample data
        </div>
      </div>
    );
  }

  return (
    <main
      data-testid="mainPage"
      className="min-h-screen w-full max-w-7xl mx-auto flex flex-col gap-5 p-10"
    >
      <DatePickerForm
        data-testid="DatePickerForm"
        from={firstDate}
        to={lastDate}
      />
    </main>
  );
};

export default MainPage;
