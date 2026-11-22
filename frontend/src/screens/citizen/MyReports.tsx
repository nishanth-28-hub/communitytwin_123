import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Badge, Card, Button } from "../../components/common"
import { CitizenHeader, CommunityHeader, MobileNav } from "../../components/layout"
import {
  citizenReports,
  reportTimeline,
  communityTeams,
} from "../../constants/mockData"

export function MyReports({
  onNavigate,
  communityMode = false,
}: {
  onNavigate: (screen: Screen) => void
  communityMode?: boolean
}) {
  const [activeTab, setActiveTab] = useState("All")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(
    communityMode ? "CT-2025-0312" : "CT-2025-0418",
  )
  const [selectedTeam, setSelectedTeam] = useState(communityTeams[0].name)
  const [assignments, setAssignments] = useState<
    Record<string, { team: string; assignedAt: string }>
  >({})
  const selectedReport =
    citizenReports.find((report) => report.id === selectedId) ??
    citizenReports[0]
  const communityAssignment = assignments[selectedReport.id]
  const displayedTeam = communityAssignment?.team ?? selectedReport.team
  const displayedStage = communityAssignment
    ? Math.max(selectedReport.stage, 3)
    : selectedReport.stage
  const tabs = [
    "All",
    "Active",
    "In Progress",
    "Awaiting Verification",
    "Resolved",
  ]
  const filtered = citizenReports.filter((report) => {
    const tabMatch =
      activeTab === "All" ||
      (activeTab === "Active" &&
        !["Resolved", "Awaiting Verification", "In Progress"].includes(
          report.status,
        )) ||
      report.status === activeTab
    const queryMatch = `${report.id} ${report.title} ${report.location}`
      .toLowerCase()
      .includes(query.toLowerCase())
    return tabMatch && queryMatch
  })

  return (
    <div className="citizen-app reports-app">
      {communityMode ? (
        <CommunityHeader />
      ) : (
        <CitizenHeader active="reports" onNavigate={onNavigate} />
      )}
      <main className="reports-main">
        <div className="citizen-page-heading">
          <div>
            <div className="eyebrow">
              {communityMode
                ? "YELAHANKA NEW TOWN · WARD VIEW"
                : "CIVIC REPORT HISTORY"}
            </div>
            <h1>{communityMode ? "Community progress" : "My reports"}</h1>
            <p>
              {communityMode
                ? "Coordinate nearby groups and track local issues through verified resolution."
                : "Follow every issue from first report to verified resolution."}
            </p>
          </div>
          {communityMode ? (
            <div className="community-data-note">
              <Icon name="shield" size={17} />
              <span>
                <strong>Prototype community access</strong>
                Assignments stay in this demonstration only
              </span>
            </div>
          ) : (
            <Button icon="plus" onClick={() => onNavigate("report")}>
              Report an issue
            </Button>
          )}
        </div>

        <section className="report-summary-row">
          <Card>
            <span className="summary-icon summary-blue">
              <Icon name="ticket" />
            </span>
            <div>
              <small>{communityMode ? "LOCAL ISSUES" : "TOTAL REPORTS"}</small>
              <strong>{communityMode ? "24" : "08"}</strong>
              <p>{communityMode ? "Across this ward" : "Since January 2025"}</p>
            </div>
          </Card>
          <Card>
            <span className="summary-icon summary-amber">
              <Icon name="clock" />
            </span>
            <div>
              <small>OPEN</small>
              <strong>{communityMode ? "09" : "02"}</strong>
              <p>Currently being handled</p>
            </div>
          </Card>
          <Card>
            <span className="summary-icon summary-teal">
              <Icon name="shield" />
            </span>
            <div>
              <small>AWAITING VERIFICATION</small>
              <strong>{communityMode ? "03" : "01"}</strong>
              <p>Evidence under review</p>
            </div>
          </Card>
          <Card>
            <span className="summary-icon summary-green">
              <Icon name="check" />
            </span>
            <div>
              <small>VERIFIED RESOLVED</small>
              <strong>{communityMode ? "12" : "05"}</strong>
              <p>
                {communityMode ? "50% of local issues" : "62.5% of reports"}
              </p>
            </div>
          </Card>
        </section>

        <Card className="reports-workspace">
          <div className="reports-toolbar">
            <div className="report-tabs">
              {tabs.map((tab) => (
                <button
                  className={activeTab === tab ? "active" : ""}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tab === "All" && <b>8</b>}
                  {tab === "In Progress" && <b>1</b>}
                  {tab === "Awaiting Verification" && <b>1</b>}
                </button>
              ))}
            </div>
            <label className="reports-search">
              <Icon name="search" size={17} />
              <input
                aria-label={
                  communityMode
                    ? "Search community issues"
                    : "Search my reports"
                }
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search reports"
                value={query}
              />
            </label>
          </div>

          <div className="reports-content">
            <div className="reports-list-panel">
              <div className="reports-list-heading">
                <span>
                  <strong>{filtered.length}</strong> matching reports
                </span>
                <button>
                  <Icon name="filter" size={15} /> Newest first
                </button>
              </div>
              {filtered.length ? (
                filtered.map((report) => (
                  <button
                    className={`citizen-report-item ${
                      selectedReport.id === report.id ? "selected" : ""
                    }`}
                    key={report.id}
                    onClick={() => setSelectedId(report.id)}
                  >
                    <img
                      alt={`Sample issue for ${report.title}`}
                      src={report.image}
                    />
                    <div className="citizen-report-copy">
                      <div>
                        <Badge tone={report.tone}>{report.status}</Badge>
                        <span>{report.id}</span>
                      </div>
                      <h2>{report.title}</h2>
                      <p>
                        <Icon name="pin" size={14} /> {report.location}
                      </p>
                      <small>
                        {report.date} · {report.supports} supporting reports
                      </small>
                    </div>
                    <Icon name="chevron" size={17} />
                  </button>
                ))
              ) : (
                <div className="reports-empty">
                  <span>
                    <Icon name="search" size={24} />
                  </span>
                  <h3>No reports found</h3>
                  <p>Try another search or status tab.</p>
                  <button
                    onClick={() => {
                      setQuery("")
                      setActiveTab("All")
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <aside className="report-detail-panel">
              <div className="report-detail-image">
                <img
                  alt={`Sample issue for ${selectedReport.title}`}
                  src={selectedReport.image}
                />
                <Badge tone={selectedReport.tone}>
                  {selectedReport.status}
                </Badge>
              </div>
              <div className="report-detail-body">
                <div className="detail-ticket">
                  <span>{selectedReport.id}</span>
                  <button>
                    <Icon name="more" size={18} />
                  </button>
                </div>
                <h2>{selectedReport.title}</h2>
                <p className="detail-address">
                  <Icon name="pin" size={16} /> {selectedReport.location}
                </p>
                <div className="latest-update">
                  <span>
                    <Icon name="bell" size={17} />
                  </span>
                  <div>
                    <small>LATEST UPDATE</small>
                    <strong>
                      {communityAssignment
                        ? `${communityAssignment.team} was assigned ${communityAssignment.assignedAt}.`
                        : selectedReport.update}
                    </strong>
                  </div>
                </div>
                {communityMode && (
                  <div className="community-assignment">
                    <div className="assignment-heading">
                      <span>
                        <Icon name="team" size={18} />
                      </span>
                      <div>
                        <small>LOCAL RESPONSE</small>
                        <strong>Assign to nearby people</strong>
                      </div>
                      {communityAssignment && (
                        <Badge tone="green">Assigned</Badge>
                      )}
                    </div>
                    <label>
                      <span>Community group</span>
                      <select
                        onChange={(event) =>
                          setSelectedTeam(event.target.value)
                        }
                        value={selectedTeam}
                      >
                        {communityTeams.map((team) => (
                          <option key={team.name} value={team.name}>
                            {team.name} · {team.members} people ·{" "}
                            {team.distance}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="button button-primary assignment-button"
                      disabled={selectedReport.status === "Resolved"}
                      onClick={() =>
                        setAssignments((current) => ({
                          ...current,
                          [selectedReport.id]: {
                            team: selectedTeam,
                            assignedAt: "just now",
                          },
                        }))
                      }
                    >
                      <Icon
                        name={communityAssignment ? "check" : "team"}
                        size={17}
                      />
                      <span>
                        {selectedReport.status === "Resolved"
                          ? "Issue already resolved"
                          : communityAssignment
                            ? "Update assignment"
                            : "Assign this work"}
                      </span>
                    </button>
                    <p>
                      <Icon name="shield" size={14} />
                      Community groups should only handle safe local tasks.
                      Roads, drains, electrical work, and hazardous repairs
                      remain under municipal supervision.
                    </p>
                  </div>
                )}
                <div className="report-detail-facts">
                  <div>
                    <small>SEVERITY</small>
                    <strong>{selectedReport.severity}</strong>
                  </div>
                  <div>
                    <small>SUPPORTING REPORTS</small>
                    <strong>{selectedReport.supports} citizens</strong>
                  </div>
                  <div>
                    <small>ASSIGNED TEAM</small>
                    <strong>{displayedTeam}</strong>
                  </div>
                  <div>
                    <small>REPORTED</small>
                    <strong>{selectedReport.date}</strong>
                  </div>
                </div>
                <div className="vertical-timeline">
                  {reportTimeline.map((stage, index) => (
                    <div
                      className={`${
                        index <= displayedStage ? "complete" : ""
                      } ${index === displayedStage ? "current" : ""}`}
                      key={stage}
                    >
                      <i>
                        {index < displayedStage && (
                          <Icon name="check" size={10} />
                        )}
                      </i>
                      <span>
                        <strong>{stage}</strong>
                        {index === displayedStage && (
                          <small>Current status</small>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                {!communityMode && (
                  <Button
                    icon="map"
                    onClick={() => onNavigate("community-map")}
                  >
                    View on community map
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </Card>
      </main>
      {!communityMode && <MobileNav active="reports" onNavigate={onNavigate} />}
    </div>
  )
}
