"use client"

import { toast } from "sonner"
import { deleteBooking } from "../_actions/booking/delete-booking"
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
import { Button } from "./ui/button"

interface CancelBookingDialogProps {
  bookingId: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSuccess?: () => void
  children: React.ReactNode
}

export const CancelBookingDialog = ({
  bookingId,
  open,
  onOpenChange,
  onSuccess,
  children,
}: CancelBookingDialogProps) => {
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(bookingId)
      toast.success("Reserva cancelada com sucesso")
      onSuccess?.()
    } catch (error) {
      toast.error("Erro ao cancelar reserva")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Você quer cancelar sua reserva?</AlertDialogTitle>
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
  )
}
