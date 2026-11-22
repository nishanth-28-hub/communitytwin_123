import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Badge, Card, Button, SectionTitle, StatCard } from "../../components/common"
import { MunicipalShell } from "../../components/layout"
import { CivicMap } from "../../components/map/CivicMap"
import { twinLocations } from "../../constants/mockData"

export function Overview({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [selectedMapLocation, setSelectedMapLocation] = useState(
    twinLocations[3],
  )
  const [mapZoom, setMapZoom] = useState(1)
  const [overviewMapQuery, setOverviewMapQuery] = useState("")
  const overviewMarkers = twinLocations.filter((location) =>
    `${location.name} ${location.zone} ${location.categoryLabel}`
      .toLowerCase()
      .includes(overviewMapQuery.toLowerCase()),
  )
  return (
    <MunicipalShell active="Overview" onNavigate={onNavigate}>
      <main className="admin-main">
        <div className="admin-heading">
          <div>
            <div className="eyebrow">OPERATIONS OVERVIEW</div>
            <h1>Good morning, Ravi.</h1>
            <p>Yelahanka civic operations · Monday, 24 February 2025</p>
          </div>
          <div className="heading-actions">
            <button className="date-filter">
              <Icon name="calendar" size={17} /> Last 30 days{" "}
              <Icon name="chevron" size={14} />
            </button>
            <Button variant="secondary" icon="upload">
              Export report
            </Button>
          </div>
        </div>
        <section className="admin-stats">
          <StatCard
            label="TOTAL REPORTS"
            value="1,284"
            delta="+12.4% this month"
            icon="ticket"
            tone="blue"
          />
          <StatCard
            label="ACTIVE CRITICAL"
            value="18"
            delta="4 need assignment"
            icon="warning"
            tone="red"
          />
          <StatCard
            label="IN PROGRESS"
            value="47"
            delta="12 teams active"
            icon="team"
            tone="amber"
          />
          <StatCard
            label="AWAITING VERIFICATION"
            value="05"
            delta="2 over 24 hours"
            icon="clock"
            tone="teal"
          />
          <StatCard
            label="VERIFIED RESOLVED"
            value="892"
            delta="69.5% resolution rate"
            icon="check"
            tone="green"
          />
        </section>
        <section className="overview-grid">
          <Card className="operations-map">
            <SectionTitle
              title="Live civic conditions"
              detail="184 active master tickets · sample operational data"
              action={
                <button
                  className="text-action"
                  onClick={() => onNavigate("digital-twin")}
                >
                  Open digital twin <Icon name="arrow" size={16} />
                </button>
              }
            />
            <div className="overview-risk-strip">
              <span>
                <i className="legend-flood" />
                <b>1 critical</b> flood-risk zone
              </span>
              <span>
                <i className="legend-water" />
                <b>1,850</b> potentially affected by water stress
              </span>
              <small>SIMULATED RISK SUMMARY</small>
            </div>
            <div className="admin-map-tools">
              <label className="search-field">
                <Icon name="search" size={18} />
                <input
                  aria-label="Search dashboard map"
                  onChange={(event) => setOverviewMapQuery(event.target.value)}
                  placeholder="Search map"
                  value={overviewMapQuery}
                />
              </label>
              <div>
                <button
                  className="filter-button"
                  onClick={() => onNavigate("digital-twin")}
                >
                  <Icon name="layers" size={17} /> All layers
                </button>
                <button
                  className="filter-button"
                  onClick={() => onNavigate("digital-twin")}
                >
                  <Icon name="filter" size={17} /> Filters
                </button>
              </div>
            </div>
            <CivicMap
              markers={overviewMarkers}
              onSelect={setSelectedMapLocation}
              onZoomChange={setMapZoom}
              selectedId={selectedMapLocation.id}
              zoom={mapZoom}
            />
            <Card className="map-issue-card">
              <span
                className={`map-card-category pin-${selectedMapLocation.category}`}
              >
                <Icon
                  name={
                    selectedMapLocation.category === "normal"
                      ? "check"
                      : "warning"
                  }
                  size={20}
                />
              </span>
              <div>
                <span className="ticket-id">{selectedMapLocation.id}</span>
                <Badge
                  tone={
                    selectedMapLocation.risk === "Critical"
                      ? "red"
                      : selectedMapLocation.risk === "Normal"
                        ? "green"
                        : "amber"
                  }
                >
                  {selectedMapLocation.risk}
                </Badge>
                <h3>{selectedMapLocation.name}</h3>
                <p>
                  <Icon name="pin" size={14} /> {selectedMapLocation.zone}
                </p>
                <div>
                  <span>
                    <b>{selectedMapLocation.categoryLabel}</b>
                  </span>
                </div>
              </div>
              <button onClick={() => onNavigate("digital-twin")}>
                <Icon name="arrow" size={18} />
              </button>
            </Card>
          </Card>
          <Card className="urgent-list">
            <SectionTitle
              title="Urgent issues"
              detail="Ranked by MCDA priority score"
              action={
                <button
                  className="text-action"
                  onClick={() => onNavigate("priority")}
                >
                  View queue
                </button>
              }
            />
            {[
              [
                "01",
                "CT-2025-0418",
                "Large pothole",
                "Yelahanka New Town",
                "88.4",
              ],
              [
                "02",
                "CT-2025-0372",
                "Drainage overflow",
                "Attur Layout",
                "84.2",
              ],
              [
                "03",
                "CT-2025-0406",
                "Garbage accumulation",
                "Kogilu Main Road",
                "79.8",
              ],
              [
                "04",
                "CT-2025-0368",
                "Damaged footpath",
                "Judicial Layout",
                "74.1",
              ],
            ].map((item, index) => (
              <button
                className="urgent-row"
                key={item[1]}
                onClick={() => index === 0 && onNavigate("priority")}
              >
                <span className="rank">{item[0]}</span>
                <span
                  className={`priority-bar priority-${
                    index < 2 ? "red" : index === 2 ? "amber" : "blue"
                  }`}
                />
                <div>
                  <small>{item[1]}</small>
                  <strong>{item[2]}</strong>
                  <p>{item[3]}</p>
                </div>
                <b>{item[4]}</b>
                <Icon name="chevron" size={16} />
              </button>
            ))}
          </Card>
        </section>
        <section className="analytics-row">
          <Card className="trend-card">
            <SectionTitle
              title="Reports & resolutions"
              detail="Last 6 months"
            />
            <div className="chart-key">
              <span>
                <i className="blue-key" /> Reports
              </span>
              <span>
                <i className="green-key" /> Resolved
              </span>
            </div>
            <div className="line-chart">
              <div className="grid-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg viewBox="0 0 500 120" preserveAspectRatio="none">
                <path
                  className="reports-line"
                  d="M0 88 C65 90 75 50 145 61 S220 30 285 46 S370 58 500 15"
                />
                <path
                  className="resolved-line"
                  d="M0 102 C70 95 88 82 150 86 S220 64 290 70 S380 45 500 38"
                />
              </svg>
              <div className="months">
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
              </div>
            </div>
          </Card>
          <Card className="category-card">
            <SectionTitle
              title="Issues by category"
              detail="Active master tickets"
            />
            <div className="donut-wrap">
              <div className="donut">
                <strong>184</strong>
                <span>ACTIVE</span>
              </div>
              <div className="category-list">
                <span>
                  <i className="cat-blue" /> Potholes <b>72</b>
                </span>
                <span>
                  <i className="cat-teal" /> Garbage <b>48</b>
                </span>
                <span>
                  <i className="cat-amber" /> Drainage <b>39</b>
                </span>
                <span>
                  <i className="cat-gray" /> Other <b>25</b>
                </span>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </MunicipalShell>
  )
}
