import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Card, Button } from "../../components/common"
import { CitizenHeader, MobileNav } from "../../components/layout"
import { citizenUpdates } from "../../constants/mockData"

export function Updates({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const initiallyRead = citizenUpdates
    .filter((update) => !update.unread)
    .map((update) => update.id)
  const [readIds, setReadIds] = useState(initiallyRead)
  const [filter, setFilter] = useState("All")
  const filters = ["All", "Unread", "Reports", "System"]
  const visibleUpdates = citizenUpdates.filter((update) => {
    if (filter === "Unread") return !readIds.includes(update.id)
    if (filter === "Reports" || filter === "System")
      return update.category === filter
    return true
  })
  const unreadCount = citizenUpdates.filter(
    (update) => !readIds.includes(update.id),
  ).length

  const openUpdate = (update: typeof citizenUpdates[number]) => {
    setReadIds((current) =>
      current.includes(update.id) ? current : [...current, update.id],
    )
    onNavigate(update.action)
  }

  return (
    <div className="citizen-app updates-app">
      <CitizenHeader onNavigate={onNavigate} />
      <main className="updates-main">
        <div className="citizen-page-heading">
          <div>
            <div className="eyebrow">ACTIVITY CENTRE</div>
            <h1>Updates</h1>
            <p>Track report progress and important CommunityTwin notices.</p>
          </div>
          <Button
            variant="secondary"
            icon="check"
            onClick={() =>
              setReadIds(citizenUpdates.map((update) => update.id))
            }
          >
            Mark all as read
          </Button>
        </div>

        <section className="updates-summary">
          <Card>
            <span className="summary-icon summary-blue">
              <Icon name="bell" />
            </span>
            <div>
              <small>UNREAD UPDATES</small>
              <strong>{unreadCount.toString().padStart(2, "0")}</strong>
              <p>Needs your attention</p>
            </div>
          </Card>
          <Card>
            <span className="summary-icon summary-green">
              <Icon name="check" />
            </span>
            <div>
              <small>RESOLVED REPORTS</small>
              <strong>05</strong>
              <p>Verified by the authority</p>
            </div>
          </Card>
          <Card>
            <span className="summary-icon summary-amber">
              <Icon name="team" />
            </span>
            <div>
              <small>ACTIVE FIELD WORK</small>
              <strong>01</strong>
              <p>RoadCare-02 assigned</p>
            </div>
          </Card>
        </section>

        <Card className="updates-workspace">
          <div className="updates-toolbar">
            <div className="updates-tabs">
              {filters.map((item) => (
                <button
                  className={filter === item ? "active" : ""}
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "Unread" && unreadCount > 0 && <b>{unreadCount}</b>}
                </button>
              ))}
            </div>
            <span>
              <i /> Prototype updates · sample data
            </span>
          </div>

          {visibleUpdates.length ? (
            <div className="updates-list">
              {["Today", "Earlier"].map((group) => {
                const groupUpdates = visibleUpdates.filter(
                  (update) => update.date === group,
                )
                if (!groupUpdates.length) return null
                return (
                  <section key={group}>
                    <h2>{group}</h2>
                    {groupUpdates.map((update) => {
                      const isUnread = !readIds.includes(update.id)
                      return (
                        <button
                          className={`update-row ${isUnread ? "unread" : ""}`}
                          key={update.id}
                          onClick={() => openUpdate(update)}
                        >
                          <span className={`update-icon update-${update.tone}`}>
                            <Icon name={update.icon} size={19} />
                          </span>
                          <div>
                            <span className="update-title">
                              <strong>{update.title}</strong>
                              {isUnread && <i />}
                            </span>
                            <p>{update.description}</p>
                            <small>
                              {update.ticket && <b>{update.ticket}</b>}
                              {update.ticket && " · "}
                              {update.time}
                            </small>
                          </div>
                          <span className="update-category">
                            {update.category}
                          </span>
                          <Icon name="chevron" size={17} />
                        </button>
                      )
                    })}
                  </section>
                )
              })}
            </div>
          ) : (
            <div className="updates-empty">
              <span>
                <Icon name="check" size={27} />
              </span>
              <h2>You’re all caught up</h2>
              <p>There are no unread updates right now.</p>
              <button onClick={() => setFilter("All")}>
                View all activity
              </button>
            </div>
          )}
        </Card>
      </main>
      <MobileNav active="" onNavigate={onNavigate} />
    </div>
  )
}
