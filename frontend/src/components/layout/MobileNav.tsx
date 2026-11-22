import type { Screen, IconName } from "../../types"
import { Icon } from "../common"

export function MobileNav({
  active,
  onNavigate,
}: {
  active: string
  onNavigate: (screen: Screen) => void
}) {
  const items: { icon: IconName; label: string; action?: Screen }[] = [
    { icon: "home", label: "Home", action: "citizen" },
    { icon: "map", label: "Map", action: "community-map" },
    { icon: "plus", label: "Report", action: "report" },
    { icon: "ticket", label: "Reports", action: "my-reports" },
    { icon: "user", label: "Profile" },
  ]
  return (
    <div className="mobile-nav">
      {items.map((item) => (
        <button
          className={`${active === item.label.toLowerCase() ? "active" : ""} ${
            item.label === "Report" ? "report-nav" : ""
          }`}
          key={item.label}
          onClick={() => item.action && onNavigate(item.action)}
        >
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
