import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Badge, Card, Button, SearchField } from "../../components/common"
import { MunicipalShell } from "../../components/layout"
import { queueRows } from "../../constants/mockData"
import { issueImage } from "../../constants/assets"

export function PriorityQueue({
  onNavigate,
}: {
  onNavigate: (screen: Screen) => void
}) {
  const [selected, setSelected] = useState(true)
  return (
    <MunicipalShell active="AI Priority Queue" onNavigate={onNavigate}>
      <main className="admin-main priority-main">
        <div className="admin-heading">
          <div>
            <div className="eyebrow">INTELLIGENT PRIORITIZATION</div>
            <h1>AI Priority Queue</h1>
            <p>
              Explainable issue ranking using weighted MCDA · illustrative
              sample scores
            </p>
          </div>
          <Button variant="secondary" icon="settings">
            Configure weights
          </Button>
        </div>
        <Card className="formula-card">
          <div className="formula-icon">
            <Icon name="spark" />
          </div>
          <div>
            <small>WEIGHTED MCDA FORMULA</small>
            <strong>P = (0.4 × S) + (0.4 × F) + (0.2 × L)</strong>
            <p>
              Severity, normalized repeat frequency, and location urgency are
              each scored on a consistent 0–100 scale.
            </p>
          </div>
          <div className="formula-weights">
            <span>
              <i className="weight-blue" /> Severity <b>40%</b>
            </span>
            <span>
              <i className="weight-teal" /> Frequency <b>40%</b>
            </span>
            <span>
              <i className="weight-amber" /> Location <b>20%</b>
            </span>
          </div>
          <button className="text-action">
            How scoring works <Icon name="arrow" size={15} />
          </button>
        </Card>
        <Card className="queue-card">
          <div className="queue-toolbar">
            <SearchField placeholder="Search by ticket or location..." />
            <div>
              <button className="filter-button">
                <Icon name="filter" size={17} /> All categories
              </button>
              <button className="filter-button">
                All localities <Icon name="chevron" size={14} />
              </button>
              <button className="filter-button">
                Needs action <Icon name="chevron" size={14} />
              </button>
            </div>
          </div>
          <div className="queue-count">
            <strong>184 prioritized master tickets</strong>
            <span>Last recalculated 8 minutes ago</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>ISSUE</th>
                  <th>LOCATION</th>
                  <th>SEVERITY</th>
                  <th>REPORTS</th>
                  <th>LOCATION URGENCY</th>
                  <th>PRIORITY SCORE</th>
                  <th>ASSIGNMENT</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {queueRows.map((row, index) => (
                  <tr
                    className={index === 0 && selected ? "selected" : ""}
                    key={row.id}
                    onClick={() => index === 0 && setSelected(true)}
                  >
                    <td>
                      <span className={`table-rank rank-${row.tone}`}>
                        {row.rank}
                      </span>
                    </td>
                    <td>
                      <div className="issue-cell">
                        <img
                          src={row.image}
                          alt={`Sample evidence for ${row.type.toLowerCase()}`}
                        />
                        <div>
                          <strong>{row.type}</strong>
                          <small>{row.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="location-cell">
                        <Icon name="pin" size={15} />
                        {row.location}
                      </span>
                    </td>
                    <td>
                      <span className="score-bar">
                        <i style={{ width: `${row.severity}%` }} />
                        <b>{row.severity}</b>
                      </span>
                    </td>
                    <td>
                      <strong>{row.reports}</strong>
                      <small className="normalized">
                        Norm. {Math.min(100, row.reports * 6)}
                      </small>
                    </td>
                    <td>
                      <strong>{row.urgency}</strong>
                      <small>School / main road</small>
                    </td>
                    <td>
                      <span className={`priority-score score-${row.tone}`}>
                        {row.score}
                      </span>
                    </td>
                    <td>
                      <Badge
                        tone={
                          row.status === "Unassigned"
                            ? "gray"
                            : row.status === "Assigned"
                              ? "blue"
                              : "amber"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td>
                      <button className="icon-button">
                        <Icon name="more" size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        {selected && (
          <div className="priority-drawer">
            <div className="drawer-head">
              <div>
                <small>RANK #01 · CRITICAL</small>
                <h2>CT-2025-0418</h2>
              </div>
              <button onClick={() => setSelected(false)}>
                <Icon name="close" />
              </button>
            </div>
            <img src={issueImage} alt="Selected pothole sample" />
            <h3>Large pothole near school crossing</h3>
            <p>
              <Icon name="pin" size={15} /> 4th Main Road, Yelahanka New Town
            </p>
            <div className="score-total">
              <span>Computed priority</span>
              <strong>
                88.4<small>/100</small>
              </strong>
            </div>
            <div className="breakdown">
              <div>
                <span>
                  <i className="weight-blue" /> Severity
                </span>
                <b>94 × 0.4</b>
                <strong>37.6</strong>
              </div>
              <div>
                <span>
                  <i className="weight-teal" /> Frequency
                </span>
                <b>85 × 0.4</b>
                <strong>34.0</strong>
              </div>
              <div>
                <span>
                  <i className="weight-amber" /> Location urgency
                </span>
                <b>84 × 0.2</b>
                <strong>16.8</strong>
              </div>
            </div>
            <div className="drawer-note">
              <Icon name="warning" size={17} /> Sample score for demonstration.
              Officer review is required before assignment.
            </div>
            <Button icon="team" onClick={() => onNavigate("verification")}>
              Assign RoadCare-02
            </Button>
            <Button variant="secondary">Open full issue</Button>
          </div>
        )}
      </main>
    </MunicipalShell>
  )
}
