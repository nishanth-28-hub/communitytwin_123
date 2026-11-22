import type { ReactNode } from "react"
import type { IconName } from "../../types"
import { Icon } from "./Icon"

export function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  className = "",
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "quiet" | "danger"
  icon?: IconName
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}
