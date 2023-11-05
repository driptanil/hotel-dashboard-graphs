import { prisma } from "@/lib/prismadb";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  test: publicProcedure.query(() => {
    // return new NextResponse(JSON.stringify({ message: "Hello world!" }));
    return 100;
  }),

  getBookingsByCountries: publicProcedure.query(async () => {
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
    });

    return bookings;
  }),

  getBookingsByDates: publicProcedure.query(async () => {
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
    });

    return bookings;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
