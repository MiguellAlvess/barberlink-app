"use client"

import { Button } from "@/app/_components/ui/button"
import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"

interface PhoneItemsProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemsProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso")
  }
  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={16} />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="secondary"
        size={"sm"}
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
