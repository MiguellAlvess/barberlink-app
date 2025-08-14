import { Booking } from "@prisma/client"
import { TIME_LIST } from "../_constants/time-list"
import { isPast, isToday, set } from "date-fns"

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}
export const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])
    const isOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minutes }),
    )
    if (isOnThePast && isToday(selectedDay)) {
      return false
    }
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}
