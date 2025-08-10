import { db } from "@/app/_lib/prisma"
import { Barbershop } from "@prisma/client"

export const getPopularBarbershops = async (): Promise<Barbershop[]> => {
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return popularBarbershops
}
