import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search-options"
import { getBarbershops } from "./_data_access/barbershops/get-barbershops"
import { getPopularBarbershops } from "./_data_access/barbershops/get-popularbarbershops"

const Home = async () => {
  const barberShops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  return (
    <div>
      <Header />
      {/* TEXTO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
        <p>Domingo, 08 de agosto</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="O que você procura?" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* buscar rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
            alt="BarberLink Banner"
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit rounded-xl">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barberia Show</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">08</p>
              <p className="text-sm">16:00</p>
            </div>
          </CardContent>
        </Card>

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShops) => (
            <BarbershopItem key={barberShops.id} barbershop={barberShops} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barberShops) => (
            <BarbershopItem key={barberShops.id} barbershop={barberShops} />
          ))}
        </div>
      </div>
      <footer>
        <Card className="flex items-center justify-center px-5 py-6">
          <CardContent>
            <p className="text-sm text-gray-400">
              © 2025 Copyright <span className="font-bold">BarberLink</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
