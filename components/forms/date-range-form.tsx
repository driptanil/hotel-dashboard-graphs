"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, dateDiffInDays } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import { useTheme } from "next-themes";
import ByDateGraphs from "../by-date/by-date-graphs";
import ByCountryGraphs from "../by-country/by-country-graphs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const FormSchema = z.object({
  date: z.object({ from: z.date(), to: z.date() }),
});

interface IDatePickerFormProps {
  from: string;
  to: string;
}

const DatePickerForm: React.FunctionComponent<IDatePickerFormProps> = ({
  from,
  to,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: new Date(addDays(new Date(to), -15)),
        to: new Date(to),
      },
    },
  });

  //   const [data, setData] = React.useState<any>(null);

  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.getBookingsByDates.useQuery({
    date: {
      from: form.getValues().date.from.toISOString(),
      to: form.getValues().date.to.toISOString(),
    },
  });

  const { data: countryData, isLoading: isLoadingCountry } =
    trpc.getBookingsByCountries.useQuery({
      date: {
        from: form.getValues().date.from.toISOString(),
        to: form.getValues().date.to.toISOString(),
      },
    });

  const formattedData = data?.map((item) => ({
    ...item,
    total: item._sum.adults! + item._sum.children! + item._sum.babies!,
  }));

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    utils.getBookingsByDates.refetch({
      date: {
        from: values.date.from.toISOString(),
        to: values.date.to.toISOString(),
      },
    });
    // console.log(values.date);
  }

  const { resolvedTheme } = useTheme();

  //   console.log(data?.length);

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Range</FormLabel>
                <div className="flex-col sm:flex-row flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full sm:w-[300px] pl-5 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <span>
                              {format(field.value.from, "do MMM yyyy")} -{" "}
                              {format(field.value.to, "do MMM yyyy")}
                            </span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={(event) => {
                          field.onChange(
                            event || {
                              from: new Date(from),
                              to: new Date(to),
                            }
                          );
                          form.handleSubmit(onSubmit);
                        }}
                        disabled={(date) =>
                          date < new Date(from) || date > new Date(to)
                        }
                        defaultMonth={field.value.from}
                        initialFocus
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <Button type="submit">Fetch</Button>
                </div>
                <FormDescription className="text-xs">
                  Select the start and end date of booking records
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isLoading ? (
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
      ) : formattedData ? (
        <ByDateGraphs
          data={formattedData}
          resolvedTheme={resolvedTheme || "dark"}
          days={dateDiffInDays(
            form.getValues().date.from,
            form.getValues().date.to
          )}
        />
      ) : (
        <>No data</>
      )}
      {isLoadingCountry ? (
        <Card className="animate-pulse h-[400px]">
          <CardHeader>
            <CardDescription className="h-4 rounded w-1/3 bg-secondary/50"></CardDescription>
            <CardTitle className="h-10 rounded-md w-1/5 bg-secondary/50"></CardTitle>
          </CardHeader>
        </Card>
      ) : countryData ? (
        <ByCountryGraphs
          data={countryData}
          resolvedTheme={resolvedTheme || "dark"}
        />
      ) : (
        <>No Data</>
      )}
    </>
  );
};

export default DatePickerForm;
