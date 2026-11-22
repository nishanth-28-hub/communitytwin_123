import type { IconName } from "../../types"
import { Icon } from "./Icon"
import { Card } from "./Card"

export function MetricCard({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: IconName
  label: string
  value: string
  note: string
  tone: string
}) {
  return (
    <Card className="metric-card">
      <div className={`metric-icon metric-${tone}`}>
        <Icon name={icon} />
      </div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </Card>
  )
}
