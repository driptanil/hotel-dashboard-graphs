"use client";
import React from "react";

// form imports
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// icon imports
import { CalendarIcon } from "lucide-react";

// utils imports
import { addDays, format } from "date-fns";
import { cn, dateDiffInDays } from "@/lib/utils";

// trpc imports
import { trpc } from "@/app/_trpc/client";

// component imports
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// theme import
import { useTheme } from "next-themes";

// graph imports
import ByDateGraphs from "../by-date/by-date-graphs";
import ByCountryGraphs from "../by-country/by-country-graphs";

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

  const { resolvedTheme } = useTheme();

  const [boolean, setBoolean] = React.useState(false);

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
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
                          if (event?.from && event?.to) {
                            field.onChange(
                              event || {
                                from: new Date(from),
                                to: new Date(to),
                              }
                            );

                            setBoolean(!boolean);

                            utils.getBookingsByDates.invalidate({
                              date: {
                                from: field.value.from.toISOString(),
                                to: field.value.to.toISOString(),
                              },
                            });
                          }
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
      <ByDateGraphs
        isLoading={isLoading}
        data={formattedData}
        resolvedTheme={resolvedTheme || "dark"}
        days={dateDiffInDays(
          form.getValues().date.from,
          form.getValues().date.to
        )}
      />
      <ByCountryGraphs
        isLoading={isLoadingCountry}
        data={countryData}
        resolvedTheme={resolvedTheme || "dark"}
      />
    </>
  );
};

export default DatePickerForm;
