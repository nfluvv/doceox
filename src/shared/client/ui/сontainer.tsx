import { cn } from "@/shared/client/lib/utils"

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-md bg-background px-4 text-foreground shadow-xl",
        className
      )}
    >
      {children}
    </div>
  )
}
