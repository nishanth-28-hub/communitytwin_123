import type { IconName } from "../../types"
import { Icon } from "./Icon"
import { Card } from "./Card"

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone,
}: {
  label: string
  value: string
  delta: string
  icon: IconName
  tone: string
}) {
  return (
    <Card className="admin-stat">
      <div className={`metric-icon metric-${tone}`}>
        <Icon name={icon} />
      </div>
      <small>{label}</small>
      <strong>{value}</strong>
      <span>{delta}</span>
      <div className="sparkline">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </Card>
  )
}
