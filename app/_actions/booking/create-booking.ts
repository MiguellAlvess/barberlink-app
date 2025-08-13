"use server"

import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"

interface createBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: createBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("User not authenticated")
  }

  await db.booking.create({
    data: {
      ...params,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (user.user as any).id,
    },
  })
}
