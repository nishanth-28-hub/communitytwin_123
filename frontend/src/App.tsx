import { useState } from "react"
import type { AuthRole, Screen } from "./types"
import {
  Login,
  CitizenDashboard,
  CommunityMap,
  DigitalTwinPage,
  Updates,
  MyReports,
  ReportFlow,
  Overview,
  PriorityQueue,
  Verification,
} from "./screens"

export default function App() {
  const storedRole = (window.localStorage.getItem("communitytwin-role") ||
    window.sessionStorage.getItem("communitytwin-role")) as AuthRole | null
  const [authenticated, setAuthenticated] = useState(
    () =>
      window.localStorage.getItem("communitytwin-session") === "demo" ||
      window.sessionStorage.getItem("communitytwin-session") === "demo",
  )
  const [role, setRole] = useState<AuthRole>(storedRole ?? "citizen")
  const [screen, setScreen] = useState<Screen>(
    storedRole === "community" ? "community-progress" : "citizen",
  )

  if (!authenticated) {
    return (
      <Login
        onLogin={(nextRole) => {
          setRole(nextRole)
          setScreen(nextRole === "community" ? "community-progress" : "citizen")
          setAuthenticated(true)
        }}
      />
    )
  }

  if (role === "community") {
    return <MyReports communityMode onNavigate={setScreen} />
  }

  if (screen === "community-map") {
    return <DigitalTwinPage onNavigate={setScreen} />
  }

  if (screen === "digital-twin") {
    return <DigitalTwinPage municipalMode onNavigate={setScreen} />
  }

  if (screen === "my-reports") return <MyReports onNavigate={setScreen} />
  if (screen === "updates") return <Updates onNavigate={setScreen} />
  if (screen === "report") return <ReportFlow onNavigate={setScreen} />
  if (screen === "overview") return <Overview onNavigate={setScreen} />
  if (screen === "priority") return <PriorityQueue onNavigate={setScreen} />
  if (screen === "verification") return <Verification onNavigate={setScreen} />

  return <CitizenDashboard onNavigate={setScreen} />
}
