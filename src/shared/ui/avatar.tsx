import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import {cn} from "@/shared/utils"
import {useRouter} from "next/router";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & { link?: string }
>(({className, link, ...props}, ref) => {
  const router = useRouter();

  return (
  <AvatarPrimitive.Root
    ref={ref}
    onClick={link ? () => router.push(link) : undefined}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { link?: string }
>(({className, link, ...props}, ref) => {
  const router = useRouter();

  return (
  <AvatarPrimitive.Image
    ref={ref}
    onClick={link ? () => router.push(link) : undefined}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
  )
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & { link?: string }
>(({className, link, ...props}, ref) => {
  const router = useRouter();

  return (
  <AvatarPrimitive.Fallback
    ref={ref}
    onClick={link ? () => router.push(link) : undefined}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
