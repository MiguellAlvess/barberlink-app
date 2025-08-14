import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search-options"
import { getBarbershops } from "./_data_access/barbershop/get-barbershops"
import { getPopularBarbershops } from "./_data_access/barbershop/get-popularbarbershops"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import BookingItem from "./_components/booking-item"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data_access/booking/get-confirmed-bookings"
import SectionTitle from "./_components/section-title"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  const confirmedBookings = await getConfirmedBookings()
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>
        <div className="mt-6">
          <Search />
        </div>
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?search=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
            alt="BarberLink Banner"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <SectionTitle>
              <h2>Agendamentos</h2>
            </SectionTitle>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}

        <SectionTitle>Recomendados</SectionTitle>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>

        <SectionTitle>Populares</SectionTitle>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barberShops) => (
            <BarbershopItem key={barberShops.id} barbershop={barberShops} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
