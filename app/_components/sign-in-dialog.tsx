import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn("google")
  }
  return (
    <>
      <DialogHeader className="flex items-center justify-center">
        <DialogTitle className="font-bold">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription>Entre com sua conta do Google</DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="gap-1 font-semibold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src="/google.svg" alt="Google Logo" width={16} height={16} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
