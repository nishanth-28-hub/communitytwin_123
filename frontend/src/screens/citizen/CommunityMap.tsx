import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Badge, Card, Button } from "../../components/common"
import { CitizenHeader, MobileNav } from "../../components/layout"
import { CivicMap } from "../../components/map/CivicMap"
import { communityIssues, twinLocations } from "../../constants/mockData"

export function CommunityMap({
  onNavigate,
}: {
  onNavigate: (screen: Screen) => void
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [view, setView] = useState<"map" | "list">("map")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All categories")
  const [status, setStatus] = useState("All statuses")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredIssues = communityIssues.filter((issue) => {
    const matchesQuery = `${issue.id} ${issue.title} ${issue.address}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesCategory =
      category === "All categories" || issue.category === category
    const matchesStatus =
      status === "All statuses" ||
      (status === "Active" && issue.tone !== "green") ||
      (status === "Resolved" && issue.tone === "green")
    return matchesQuery && matchesCategory && matchesStatus
  })
  const selectedIssue =
    filteredIssues.find(
      (issue) => issue.id === communityIssues[selectedIndex].id,
    ) ?? filteredIssues[0]

  const selectIssue = (index: number) => {
    setSelectedIndex(index)
    setView("map")
  }

  return (
    <div className="citizen-app community-map-app">
      <CitizenHeader active="map" onNavigate={onNavigate} />
      <main className="community-map-main">
        <div className="map-page-heading">
          <div>
            <div className="eyebrow">COMMUNITY DIGITAL TWIN</div>
            <h1>Explore civic issues near you</h1>
            <p>
              Sample demonstration records around Yelahanka, Bengaluru — not
              live municipal reports.
            </p>
          </div>
          <Button icon="plus" onClick={() => onNavigate("report")}>
            Report an issue
          </Button>
        </div>

        <Card className="map-command-bar">
          <label className="map-search">
            <Icon name="search" size={19} />
            <input
              aria-label="Search map"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search locality, street or ticket ID"
              value={query}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <Icon name="close" size={15} />
              </button>
            )}
          </label>
          <button
            className={`filter-button ${filtersOpen ? "filter-active" : ""}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Icon name="filter" size={17} /> Filters
            {(category !== "All categories" || status !== "All statuses") && (
              <b>
                {Number(category !== "All categories") +
                  Number(status !== "All statuses")}
              </b>
            )}
          </button>
          <div className="map-view-switch">
            <button
              className={view === "map" ? "active" : ""}
              onClick={() => setView("map")}
            >
              <Icon name="map" size={16} /> Map
            </button>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              <Icon name="list" size={16} /> List
            </button>
          </div>
        </Card>

        {filtersOpen && (
          <Card className="map-filter-panel">
            <label>
              <span>Issue category</span>
              <select
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                <option>All categories</option>
                <option>Pothole</option>
                <option>Garbage</option>
                <option>Drainage</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select
                onChange={(event) => setStatus(event.target.value)}
                value={status}
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Resolved</option>
              </select>
            </label>
            <label>
              <span>Date reported</span>
              <select>
                <option>Any time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </label>
            <button
              className="clear-filters"
              onClick={() => {
                setCategory("All categories")
                setStatus("All statuses")
              }}
            >
              Clear all filters
            </button>
          </Card>
        )}

        <div className="map-results-summary">
          <span>
            Showing <strong>{filteredIssues.length}</strong> sample issues
            around Yelahanka
          </span>
          <span className="map-updated">
            <i /> Prototype data updated just now
          </span>
        </div>

        {filteredIssues.length === 0 ? (
          <Card className="map-empty">
            <span>
              <Icon name="search" size={28} />
            </span>
            <h2>No matching issues</h2>
            <p>Try another ticket ID, locality, or remove some filters.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("")
                setCategory("All categories")
                setStatus("All statuses")
              }}
            >
              Reset search
            </Button>
          </Card>
        ) : view === "map" ? (
          <section className="full-map-layout">
            <div className="full-map-canvas">
              <CivicMap
                markers={twinLocations}
                onSelect={(location) => {
                  const matchingIndex = communityIssues.findIndex(
                    (issue) => issue.id === location.id,
                  )
                  if (matchingIndex >= 0) selectIssue(matchingIndex)
                }}
                selectedId={selectedIssue.id}
              />
              <div className="map-result-count">
                <Icon name="layers" size={16} />
                {filteredIssues.length} issues visible
              </div>
            </div>
            <Card className="map-detail-panel">
              <div className="detail-panel-photo">
                <img
                  alt={`Sample record for ${selectedIssue.title}`}
                  src={selectedIssue.image}
                />
                <Badge tone={selectedIssue.tone}>
                  {selectedIssue.priority}
                </Badge>
                <button aria-label="Close issue details">
                  <Icon name="close" size={17} />
                </button>
              </div>
              <div className="map-detail-copy">
                <div className="detail-ticket">
                  <span>{selectedIssue.id}</span>
                  <span>{selectedIssue.distance} away</span>
                </div>
                <h2>{selectedIssue.title}</h2>
                <p className="detail-address">
                  <Icon name="pin" size={16} /> {selectedIssue.address}
                </p>
                <div className="detail-stats">
                  <div>
                    <small>STATUS</small>
                    <strong>{selectedIssue.status}</strong>
                  </div>
                  <div>
                    <small>SUPPORTING REPORTS</small>
                    <strong>{selectedIssue.reports} citizens</strong>
                  </div>
                  <div>
                    <small>PRIORITY SCORE</small>
                    <strong>{selectedIssue.score}</strong>
                  </div>
                  <div>
                    <small>CATEGORY</small>
                    <strong>{selectedIssue.category}</strong>
                  </div>
                </div>
                <div className="map-timeline-mini">
                  <span className="complete">
                    <i>
                      <Icon name="check" size={11} />
                    </i>
                    Reported
                  </span>
                  <span className="complete">
                    <i>
                      <Icon name="check" size={11} />
                    </i>
                    Prioritized
                  </span>
                  <span className="current">
                    <i />
                    {selectedIssue.tone === "green"
                      ? "Verified"
                      : "In progress"}
                  </span>
                </div>
                <div className="support-note">
                  <Icon name="layers" size={18} />
                  <p>
                    Nearby matching reports are grouped under this master ticket
                    to reduce duplicate clutter.
                  </p>
                </div>
                <Button>View full issue details</Button>
                {selectedIssue.tone !== "green" && (
                  <Button variant="secondary" icon="layers">
                    Support this issue
                  </Button>
                )}
                <small className="detail-updated">
                  {selectedIssue.updated}
                </small>
              </div>
            </Card>
          </section>
        ) : (
          <section className="map-list-view">
            {filteredIssues.map((issue) => {
              const originalIndex = communityIssues.findIndex(
                (record) => record.id === issue.id,
              )
              return (
                <Card className="map-list-card" key={issue.id}>
                  <img
                    alt={`Sample record for ${issue.title}`}
                    src={issue.image}
                  />
                  <div className="map-list-copy">
                    <div>
                      <Badge tone={issue.tone}>{issue.priority}</Badge>
                      <span className="ticket-id">{issue.id}</span>
                    </div>
                    <h2>{issue.title}</h2>
                    <p>
                      <Icon name="pin" size={15} /> {issue.address}
                    </p>
                    <span>
                      {issue.reports} supporting reports · {issue.status}
                    </span>
                  </div>
                  <div className="map-list-meta">
                    <strong>{issue.distance}</strong>
                    <small>{issue.updated}</small>
                    <Button
                      variant="secondary"
                      onClick={() => selectIssue(originalIndex)}
                    >
                      Show on map
                    </Button>
                  </div>
                </Card>
              )
            })}
          </section>
        )}
      </main>
      <MobileNav active="map" onNavigate={onNavigate} />
    </div>
  )
}
