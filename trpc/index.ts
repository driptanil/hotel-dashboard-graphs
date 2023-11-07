import { prisma } from "@/lib/prismadb";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  test: publicProcedure.query(() => {
    // return new NextResponse(JSON.stringify({ message: "Hello world!" }));
    return 100;
  }),

  // fetching first date of saved bookings
  getFirstDate: publicProcedure.query(async () => {
    const firstBooking = await prisma.booking.findFirst({
      take: 1,
      orderBy: {
        arrival_date: "asc",
      },
    });

    return firstBooking?.arrival_date;
  }),

  // fetching last date of saved bookings
  getLastDate: publicProcedure.query(async () => {
    const lastBooking = await prisma.booking.findFirst({
      take: 1,
      orderBy: {
        arrival_date: "desc",
      },
    });

    return lastBooking?.arrival_date;
  }),

  // fetching all bookings data for preview
  getAllBookingsData: publicProcedure.query(async () => {
    const bookings = await prisma.booking.findMany({});
    return bookings;
  }),

  // fetching all bookings data group by countries
  getBookingsByCountries: publicProcedure
    .input(
      z.object({
        date: z.object({
          from: z.string(),
          to: z.string(),
        }),
      })
    )
    .query(async (input) => {
      const bookings = prisma.booking.groupBy({
        by: ["country"],
        _sum: {
          adults: true,
          children: true,
          babies: true,
        },
        orderBy: {
          country: "asc",
        },
        where: {
          arrival_date: {
            gte: input.input.date.from,
            lte: input.input.date.to,
          },
        },
      });

      return bookings;
    }),

  // fetching all bookings data group by dates
  getBookingsByDates: publicProcedure
    .input(
      z.object({
        date: z.object({
          from: z.string(),
          to: z.string(),
        }),
      })
    )
    .query(async (input) => {
      const bookings = prisma.booking.groupBy({
        by: ["arrival_date"],
        _sum: {
          adults: true,
          children: true,
          babies: true,
        },
        orderBy: {
          arrival_date: "asc",
        },
        where: {
          arrival_date: {
            gte: input.input.date.from,
            lte: input.input.date.to,
          },
        },
      });

      return bookings;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
