import type { Screen } from "../../types"
import {
  Icon,
  Badge,
  Card,
  Button,
  SectionTitle,
  SearchField,
  MetricCard,
} from "../../components/common"
import { CitizenHeader, MobileNav } from "../../components/layout"
import { CivicMap } from "../../components/map/CivicMap"
import { getCitizenIdentity } from "../../utils/identity"
import { issueImage, drainageImage } from "../../constants/assets"

export function CitizenDashboard({
  onNavigate,
}: {
  onNavigate: (screen: Screen) => void
}) {
  const identity = getCitizenIdentity()
  return (
    <div className="citizen-app">
      <CitizenHeader onNavigate={onNavigate} />
      <main className="citizen-main">
        <section className="welcome-row">
          <div>
            <div className="eyebrow">MONDAY, 24 FEBRUARY</div>
            <h1>Good morning, {identity.name}.</h1>
            <p>Here’s what’s happening in your community today.</p>
          </div>
          <Button icon="plus" onClick={() => onNavigate("report")}>
            Report an issue
          </Button>
        </section>

        <section className="citizen-metrics">
          <MetricCard
            icon="ticket"
            label="MY REPORTS"
            value="08"
            note="2 active"
            tone="blue"
          />
          <MetricCard
            icon="warning"
            label="NEARBY ISSUES"
            value="24"
            note="Within 2 km"
            tone="amber"
          />
          <MetricCard
            icon="check"
            label="RESOLVED"
            value="06"
            note="75% of reports"
            tone="green"
          />
        </section>

        <section className="citizen-grid">
          <Card className="nearby-card">
            <SectionTitle
              title="Nearby community issues"
              detail="Live digital twin around Yelahanka"
              action={
                <button
                  className="text-action"
                  onClick={() => onNavigate("community-map")}
                >
                  Open full map <Icon name="arrow" size={16} />
                </button>
              }
            />
            <div className="map-toolbar">
              <SearchField placeholder="Search locality or ticket ID" />
              <button className="filter-button">
                <Icon name="filter" size={17} /> Filters <b>2</b>
              </button>
            </div>
            <CivicMap />
          </Card>

          <div className="side-stack">
            <Card className="report-cta">
              <div className="cta-icon">
                <Icon name="camera" size={25} />
              </div>
              <div>
                <small>SPOTTED SOMETHING?</small>
                <h3>Make your street better.</h3>
                <p>
                  Photograph a civic issue and we’ll help route it to the right
                  team.
                </p>
              </div>
              <Button icon="camera" onClick={() => onNavigate("report")}>
                Start a report
              </Button>
              <span className="cta-note">
                <Icon name="clock" size={15} /> Takes about 2 minutes
              </span>
            </Card>
            <Card className="notifications-card">
              <SectionTitle
                title="Updates"
                action={
                  <button
                    className="text-action"
                    onClick={() => onNavigate("updates")}
                  >
                    View all
                  </button>
                }
              />
              <button
                className="notification"
                onClick={() => onNavigate("my-reports")}
              >
                <span className="notification-icon success">
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <strong>Repair verified</strong>
                  <p>CT-2025-0391 is now resolved.</p>
                  <small>18 min ago</small>
                </div>
                <Icon name="chevron" size={15} />
              </button>
              <button
                className="notification"
                onClick={() => onNavigate("my-reports")}
              >
                <span className="notification-icon blue">
                  <Icon name="team" size={16} />
                </span>
                <div>
                  <strong>Team assigned</strong>
                  <p>RoadCare-02 will inspect your report.</p>
                  <small>Yesterday</small>
                </div>
                <Icon name="chevron" size={15} />
              </button>
            </Card>
          </div>
        </section>

        <section className="recent-section">
          <SectionTitle
            title="Your recent reports"
            detail="Track every step from report to verified repair"
            action={
              <button
                className="text-action"
                onClick={() => onNavigate("my-reports")}
              >
                View all reports <Icon name="arrow" size={16} />
              </button>
            }
          />
          <div className="report-list">
            <Card className="report-row">
              <img src={issueImage} alt="Sample road issue" />
              <div className="report-copy">
                <div>
                  <Badge tone="red">Critical</Badge>
                  <span className="ticket-id">CT-2025-0418</span>
                </div>
                <h3>Large pothole near school crossing</h3>
                <p>
                  <Icon name="pin" size={15} /> 4th Main Road, Yelahanka New
                  Town
                </p>
              </div>
              <div className="report-status">
                <Badge tone="amber">In progress</Badge>
                <small>Updated 2h ago</small>
              </div>
              <button
                className="round-arrow"
                onClick={() => onNavigate("my-reports")}
              >
                <Icon name="chevron" size={18} />
              </button>
            </Card>
            <Card className="report-row">
              <img
                src={drainageImage}
                alt="Sample flooded street drainage issue"
              />
              <div className="report-copy">
                <div>
                  <Badge tone="amber">Medium</Badge>
                  <span className="ticket-id">CT-2025-0391</span>
                </div>
                <h3>Blocked storm-water drain</h3>
                <p>
                  <Icon name="pin" size={15} /> Attur Layout, Yelahanka
                </p>
              </div>
              <div className="report-status">
                <Badge tone="green">Verified resolved</Badge>
                <small>24 Feb, 10:42</small>
              </div>
              <button
                className="round-arrow"
                onClick={() => onNavigate("my-reports")}
              >
                <Icon name="chevron" size={18} />
              </button>
            </Card>
          </div>
        </section>
      </main>
      <MobileNav active="home" onNavigate={onNavigate} />
    </div>
  )
}
