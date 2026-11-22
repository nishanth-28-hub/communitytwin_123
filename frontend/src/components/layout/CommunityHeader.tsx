import { Icon, Logo, Badge } from "../common"
import { getCitizenIdentity, clearPrototypeSession } from "../../utils/identity"

export function CommunityHeader() {
  const identity = getCitizenIdentity()
  return (
    <header className="citizen-header community-header">
      <Logo />
      <nav>
        <button className="nav-active">Community progress</button>
      </nav>
      <div className="header-actions">
        <Badge tone="teal">Community coordinator</Badge>
        <div className="avatar">{identity.initials}</div>
        <div className="profile-name">
          <strong>{identity.name}</strong>
          <small>Yelahanka New Town</small>
        </div>
        <button
          aria-label="Sign out"
          className="profile-signout"
          onClick={clearPrototypeSession}
          title="Sign out"
        >
          <Icon name="logout" size={16} />
        </button>
      </div>
    </header>
  )
}
