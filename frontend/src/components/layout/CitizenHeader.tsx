import type { Screen } from "../../types"
import { Icon, Logo } from "../common"
import { getCitizenIdentity } from "../../utils/identity"

export function CitizenHeader({
  onNavigate,
  active = "home",
}: {
  onNavigate: (screen: Screen) => void
  active?: "home" | "map" | "reports"
}) {
  const identity = getCitizenIdentity()
  return (
    <header className="citizen-header">
      <Logo />
      <nav>
        <button
          className={active === "home" ? "nav-active" : ""}
          onClick={() => onNavigate("citizen")}
        >
          Home
        </button>
        <button
          className={active === "map" ? "nav-active" : ""}
          onClick={() => onNavigate("community-map")}
        >
          Community Map
        </button>
        <button
          className={active === "reports" ? "nav-active" : ""}
          onClick={() => onNavigate("my-reports")}
        >
          My Reports
        </button>
      </nav>
      <div className="header-actions">
        <button
          className="icon-button notification-bell"
          aria-label="Notifications"
          onClick={() => onNavigate("updates")}
        >
          <Icon name="bell" />
          <i />
        </button>
        <div className="avatar">{identity.initials}</div>
        <div className="profile-name">
          <strong>{identity.name}</strong>
          <small>{identity.email}</small>
        </div>
        <button
          className="profile-signout"
          aria-label="Sign out"
          title="Sign out"
          onClick={() => {
            window.localStorage.removeItem("communitytwin-session")
            window.localStorage.removeItem("communitytwin-name")
            window.localStorage.removeItem("communitytwin-email")
            window.localStorage.removeItem("communitytwin-phone")
            window.localStorage.removeItem("communitytwin-locality")
            window.sessionStorage.removeItem("communitytwin-session")
            window.sessionStorage.removeItem("communitytwin-name")
            window.sessionStorage.removeItem("communitytwin-email")
            window.location.reload()
          }}
        >
          <Icon name="logout" size={16} />
        </button>
      </div>
    </header>
  )
}
