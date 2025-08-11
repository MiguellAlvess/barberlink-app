"use client"

import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from "lucide-react"
import { quickSearchOptions } from "../_constants/search-options"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const Sidebar = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }
  const handleLogoutClick = async () => {
    await signOut()
  }
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid pb-5 pl-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <LogInIcon size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[85%]">
                <DialogHeader className="flex items-center justify-center">
                  <DialogTitle className="font-bold">
                    Faça login na plataforma
                  </DialogTitle>
                  <DialogDescription>
                    Entre com sua conta do Google
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="gap-1 font-semibold"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={16}
                    height={16}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-2">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={16} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={16} />
          Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-4 border-b border-solid py-3">
        {quickSearchOptions.map((option) => (
          <Button
            className="justify-start gap-2"
            key={option.title}
            variant="ghost"
          >
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
      <div className="flex flex-col gap-4 py-3">
        <Button
          variant="secondary"
          className="gap-2"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={16} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default Sidebar
