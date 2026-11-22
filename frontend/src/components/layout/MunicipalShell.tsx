import type { ReactNode } from "react"
import type { Screen } from "../../types"
import { Icon, Logo, Button, SearchField } from "../common"
import { sidebarItems } from "../../constants/mockData"

export function MunicipalShell({
  active,
  onNavigate,
  children,
}: {
  active: string
  onNavigate: (screen: Screen) => void
  children: ReactNode
}) {
  return (
    <div className="municipal-shell">
      <aside className="municipal-sidebar">
        <Logo />
        <div className="workspace-pill">
          <span>YN</span>
          <div>
            <small>MUNICIPAL WORKSPACE</small>
            <strong>Yelahanka Zone</strong>
          </div>
          <Icon name="chevron" size={15} />
        </div>
        <nav>
          <small>OPERATIONS</small>
          {sidebarItems.slice(0, 6).map((item) => (
            <button
              className={active === item.label ? "active" : ""}
              key={item.label}
              onClick={() => item.screen && onNavigate(item.screen)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.label === "Resolution Verification" && <b>5</b>}
            </button>
          ))}
          <small>INSIGHTS & PROGRAMS</small>
          {sidebarItems.slice(6).map((item) => (
            <button key={item.label}>
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button>
            <Icon name="settings" size={19} /> Settings
          </button>
          <div className="officer">
            <div className="avatar">RN</div>
            <div>
              <strong>Ravi Nair</strong>
              <small>Zone Officer</small>
            </div>
            <Icon name="more" size={18} />
          </div>
        </div>
      </aside>
      <section className="municipal-workspace">
        <header className="municipal-header">
          <SearchField placeholder="Search tickets, localities or teams..." />
          <div className="header-actions">
            <span className="system-live">
              <i /> Systems online
            </span>
            <button className="icon-button">
              <Icon name="bell" />
            </button>
            <Button icon="plus" onClick={() => onNavigate("priority")}>
              New action
            </Button>
          </div>
        </header>
        {children}
      </section>
    </div>
  )
}
