export function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0] ?? ""
  const words = localPart
    .split(/[._-]+/)
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter(Boolean)
  if (!words.length) return "Citizen"
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function getCitizenIdentity() {
  const name =
    window.localStorage.getItem("communitytwin-name") ||
    window.sessionStorage.getItem("communitytwin-name") ||
    "Citizen"
  const email =
    window.localStorage.getItem("communitytwin-email") ||
    window.sessionStorage.getItem("communitytwin-email") ||
    "Citizen account"
  const initials =
    name === "Citizen"
      ? "CT"
      : name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
  return { name, email, initials }
}

export function clearPrototypeSession() {
  ;[window.localStorage, window.sessionStorage].forEach((storage) => {
    storage.removeItem("communitytwin-session")
    storage.removeItem("communitytwin-role")
    storage.removeItem("communitytwin-name")
    storage.removeItem("communitytwin-email")
  })
  window.location.reload()
}
