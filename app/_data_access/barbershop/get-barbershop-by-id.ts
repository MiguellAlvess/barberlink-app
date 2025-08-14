import "server-only"
import { db } from "@/app/_lib/prisma"

export const getBarbershopById = async (id: string) => {
  return await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })
}
