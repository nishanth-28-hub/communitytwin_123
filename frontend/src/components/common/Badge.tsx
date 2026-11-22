import type { ReactNode } from "react"

export function Badge({
  children,
  tone = "blue",
  dot = true,
}: {
  children: ReactNode
  tone?: "red" | "amber" | "blue" | "green" | "teal" | "gray"
  dot?: boolean
}) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <i />}
      {children}
    </span>
  )
}
