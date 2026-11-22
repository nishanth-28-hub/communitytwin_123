import type { ReactNode } from "react"

export type Screen =
  | "citizen"
  | "community-map"
  | "digital-twin"
  | "my-reports"
  | "community-progress"
  | "updates"
  | "report"
  | "overview"
  | "priority"
  | "verification"

export type AuthRole = "citizen" | "community"

export type IconName =
  | "home"
  | "map"
  | "plus"
  | "gift"
  | "user"
  | "bell"
  | "search"
  | "chevron"
  | "arrow"
  | "camera"
  | "spark"
  | "pin"
  | "layers"
  | "ticket"
  | "clock"
  | "check"
  | "warning"
  | "team"
  | "chart"
  | "settings"
  | "list"
  | "shield"
  | "coins"
  | "route"
  | "logout"
  | "more"
  | "filter"
  | "calendar"
  | "upload"
  | "close"

export type TwinCategory = "water" | "flood" | "waste" | "road" | "normal"

export type TwinLocation = {
  id: string
  name: string
  category: TwinCategory
  categoryLabel: string
  risk: "Critical" | "High" | "Medium" | "Low" | "Normal"
  description: string
  reported: string
  population: string
  prediction: string
  action: string
  coordinates: [number, number]
  top: string
  left: string
  zone: string
}

export type CommunityIssue = {
  id: string
  title: string
  category: string
  address: string
  status: string
  priority: string
  tone: "red" | "amber" | "blue" | "green"
  reports: number
  distance: string
  updated: string
  score: string
  image: string
}

export type CitizenUpdate = {
  id: string
  title: string
  description: string
  time: string
  date: string
  category: string
  icon: IconName
  tone: string
  unread: boolean
  ticket: string
  action: Screen
}

export type CitizenReport = {
  id: string
  title: string
  category: string
  location: string
  date: string
  status: string
  tone: "red" | "amber" | "blue" | "green" | "teal"
  severity: string
  supports: number
  image: string
  team: string
  update: string
  stage: number
}

export type CommunityTeam = {
  name: string
  members: number
  distance: string
}

export type QueueRow = {
  rank: string
  id: string
  type: string
  location: string
  severity: number
  reports: number
  urgency: number
  score: string
  status: string
  tone: string
  image: string
}

export type SidebarItem = {
  icon: IconName
  label: string
  screen?: Screen
}
