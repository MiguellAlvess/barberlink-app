import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="BarberLink Logo"
            width={160}
            height={40}
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
