"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"
import { revalidatePath } from "next/cache"

interface GetBookingProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date }: GetBookingProps) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
  return bookings
  revalidatePath("/barbershops/[id")
}
