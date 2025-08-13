"use client"

import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { Badge } from "./ui/badge"
import { isFuture, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { toast } from "sonner"
import { deleteBooking } from "../_actions/booking/delete-booking"
import { useState } from "react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isConfirmed = isFuture(booking.date)

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen)
  }
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso")
      setIsDialogOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva")
    }
  }
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[80%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit rounded-xl"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="text-left font-semibold">
                {booking.service.name}
              </h3>

              <div className="flex items-center gap-2">
                <Avatar className="h6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "MM:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Informações sobre a reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-1 flex h-[200px] w-full items-end px-3">
          <Image
            src="/map.png"
            fill
            className="rounded-xl object-cover px-2"
            alt={`Mapa da ${booking.service.barbershop.name}`}
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex max-h-[10px] items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 px-2">
          <Badge
            className="w-fit rounded-xl"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {booking.service.barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-3">
          <div className="flex items-center justify-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-[50%]">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog
                open={isDialogOpen}
                onOpenChange={handleDialogOpenChange}
              >
                <AlertDialogTrigger className="w-full" asChild>
                  <Button variant="destructive" className="w-[50%]">
                    Cancelar reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você quer cancelar sua reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao cancelar a reserva, esta ação não poderá ser revertida
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-2 flex w-full flex-row items-center justify-center gap-3">
                    <AlertDialogCancel asChild>
                      <Button className="w-[50%]" variant="outline">
                        Cancelar
                      </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        className="w-[50%]"
                        variant="destructive"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
