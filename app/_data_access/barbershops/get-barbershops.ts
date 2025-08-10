import { db } from "@/app/_lib/prisma"
import { Barbershop } from "@prisma/client"

export const getBarbershops = async (): Promise<Barbershop[]> => {
  const barbershops = await db.barbershop.findMany({})
  return barbershops
}
