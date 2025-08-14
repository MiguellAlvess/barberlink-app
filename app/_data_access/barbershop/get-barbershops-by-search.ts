import "server-only"
import { db } from "@/app/_lib/prisma"

export const getBarbershopsBySearch = async (searchParams: string) => {
  return await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: { contains: searchParams, mode: "insensitive" },
        },
        {
          services: {
            some: { name: { contains: searchParams, mode: "insensitive" } },
          },
        },
      ],
    },
  })
}
