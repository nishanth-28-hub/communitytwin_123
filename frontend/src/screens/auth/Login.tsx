import { useState } from "react"
import type { AuthRole } from "../../types"
import { Icon, Logo, Badge, Button } from "../../components/common"
import { CivicMap } from "../../components/map/CivicMap"
import { displayNameFromEmail } from "../../utils/identity"

export function Login({ onLogin }: { onLogin: (role: AuthRole) => void }) {
  const [role, setRole] = useState<AuthRole>("citizen")
  const [mode, setMode] = useState<"login" | "register">("login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [locality, setLocality] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitLogin = () => {
    if (!email.includes("@")) {
      setError("Enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.")
      return
    }
    setError("")
    setLoading(true)
    window.setTimeout(() => {
      const storage = remember ? window.localStorage : window.sessionStorage
      const otherStorage = remember
        ? window.sessionStorage
        : window.localStorage
      storage.setItem("communitytwin-session", "demo")
      storage.setItem("communitytwin-role", role)
      storage.setItem(
        "communitytwin-name",
        role === "community"
          ? "Yelahanka Community"
          : displayNameFromEmail(email),
      )
      storage.setItem("communitytwin-email", email.trim().toLowerCase())
      otherStorage.removeItem("communitytwin-session")
      otherStorage.removeItem("communitytwin-role")
      otherStorage.removeItem("communitytwin-name")
      otherStorage.removeItem("communitytwin-email")
      onLogin(role)
    }, 450)
  }

  const useDemoAccount = () => {
    setEmail(
      role === "community"
        ? "yelahanka.community@communitytwin.in"
        : "citizen.demo@communitytwin.in",
    )
    setPassword("demo2025")
    setError("")
  }

  const submitRegistration = () => {
    if (fullName.trim().length < 2) {
      setError("Enter your full name.")
      return
    }
    if (!email.includes("@")) {
      setError("Enter a valid email address.")
      return
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit mobile number.")
      return
    }
    if (!locality) {
      setError("Select your locality.")
      return
    }
    if (password.length < 8) {
      setError("Create a password with at least 8 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.")
      return
    }
    if (!acceptedTerms) {
      setError("Accept the privacy notice to continue.")
      return
    }
    setError("")
    setLoading(true)
    window.setTimeout(() => {
      window.localStorage.setItem("communitytwin-session", "demo")
      window.localStorage.setItem("communitytwin-role", "citizen")
      window.localStorage.setItem("communitytwin-name", fullName.trim())
      window.localStorage.setItem(
        "communitytwin-email",
        email.trim().toLowerCase(),
      )
      window.localStorage.setItem(
        "communitytwin-phone",
        phone.replace(/\D/g, ""),
      )
      window.localStorage.setItem("communitytwin-locality", locality)
      window.sessionStorage.removeItem("communitytwin-session")
      onLogin("citizen")
    }, 550)
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="login-brand-top">
          <Logo />
          <Badge tone="blue">
            {role === "community" ? "Community portal" : "Citizen portal"}
          </Badge>
        </div>
        <div className="login-story">
          <div className="eyebrow">
            {role === "community"
              ? "SHARED PROGRESS. CLEAR ACTION."
              : "YOUR COMMUNITY. YOUR VOICE."}
          </div>
          <h1>
            {role === "community"
              ? "See how your neighbourhood is improving."
              : "Help build a better neighbourhood."}
          </h1>
          <p>
            {role === "community"
              ? "Follow ward-wide civic issues, assign suitable local work to nearby groups, and track verified outcomes."
              : "Report civic issues, follow municipal action, and see verified repairs reflected in your community’s digital twin."}
          </p>
          <div className="login-benefits">
            <span>
              <i>
                <Icon name="camera" size={18} />
              </i>
              <b>
                {role === "community"
                  ? "Ward-wide overview"
                  : "Report in minutes"}
              </b>
              <small>
                {role === "community"
                  ? "See active issues across your locality"
                  : "Share clear photos and location details"}
              </small>
            </span>
            <span>
              <i>
                <Icon name="layers" size={18} />
              </i>
              <b>
                {role === "community"
                  ? "Shared ticket progress"
                  : "Reduce duplicate clutter"}
              </b>
              <small>
                {role === "community"
                  ? "Assign suitable work to local response groups"
                  : "Support matching issues near you"}
              </small>
            </span>
            <span>
              <i>
                <Icon name="shield" size={18} />
              </i>
              <b>Track verified outcomes</b>
              <small>Follow each step through resolution</small>
            </span>
          </div>
        </div>
        <div className="login-map-preview">
          <CivicMap compact />
          <div className="login-map-card">
            <span>
              <Icon name="warning" size={17} />
            </span>
            <div>
              <small>ACTIVE MASTER TICKET</small>
              <strong>CT-2025-0418</strong>
              <p>Repair in progress · 13 reports</p>
            </div>
          </div>
        </div>
        <p className="login-demo-map">
          Yelahanka demonstration map · Sample civic records
        </p>
      </section>

      <section className="login-form-panel">
        <div className="login-mobile-logo">
          <Logo />
        </div>
        <div className="login-form-wrap">
          <div className="portal-switch" aria-label="Choose portal">
            <button
              className={role === "citizen" ? "active" : ""}
              onClick={() => {
                setRole("citizen")
                setError("")
              }}
              type="button"
            >
              <Icon name="user" size={17} />
              Citizen
            </button>
            <button
              className={role === "community" ? "active" : ""}
              onClick={() => {
                setRole("community")
                setMode("login")
                setError("")
              }}
              type="button"
            >
              <Icon name="team" size={17} />
              Community
            </button>
          </div>
          <div className="login-heading">
            <div className="login-welcome-icon">
              <Icon name={role === "community" ? "team" : "user"} size={23} />
            </div>
            <div className="eyebrow">
              {mode === "login" ? "WELCOME BACK" : "JOIN YOUR COMMUNITY"}
            </div>
            <h2>
              {mode === "login"
                ? role === "community"
                  ? "Community progress access"
                  : "Sign in to CommunityTwin"
                : "Create your citizen profile"}
            </h2>
            <p>
              {mode === "login"
                ? role === "community"
                  ? "View issue progress and verified outcomes across Yelahanka."
                  : "Access your reports, updates, and nearby civic issues."
                : "Set up your local demonstration profile in a few steps."}
            </p>
          </div>

          <div className="prototype-auth-note">
            <Icon name="shield" size={17} />
            <p>
              <strong>
                {mode === "login"
                  ? "Prototype sign-in."
                  : "Local prototype profile."}
              </strong>{" "}
              {mode === "login"
                ? "This local demonstration does not create a real account or securely authenticate credentials."
                : "Profile details stay in this browser. Passwords are validated but are not stored."}
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault()
              mode === "login" ? submitLogin() : submitRegistration()
            }}
          >
            {mode === "register" && (
              <label>
                <span>Full name</span>
                <div
                  className={
                    error && fullName.trim().length < 2 ? "field-error" : ""
                  }
                >
                  <Icon name="user" size={17} />
                  <input
                    autoComplete="name"
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    value={fullName}
                  />
                </div>
              </label>
            )}
            <label>
              <span>Email address</span>
              <div
                className={error && !email.includes("@") ? "field-error" : ""}
              >
                <Icon name="user" size={17} />
                <input
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                />
              </div>
            </label>
            <label>
              <span>{mode === "login" ? "Password" : "Create password"}</span>
              <div
                className={
                  error && password.length < (mode === "login" ? 6 : 8)
                    ? "field-error"
                    : ""
                }
              >
                <Icon name="shield" size={17} />
                <input
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            {mode === "register" && (
              <>
                <div className="register-grid">
                  <label>
                    <span>Mobile number</span>
                    <div>
                      <Icon name="user" size={17} />
                      <input
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(event) =>
                          setPhone(event.target.value.replace(/\D/g, ""))
                        }
                        placeholder="10-digit number"
                        value={phone}
                      />
                    </div>
                  </label>
                  <label>
                    <span>Locality</span>
                    <div>
                      <Icon name="pin" size={17} />
                      <select
                        onChange={(event) => setLocality(event.target.value)}
                        value={locality}
                      >
                        <option value="">Select locality</option>
                        <option>Yelahanka New Town</option>
                        <option>Attur Layout</option>
                        <option>Kogilu</option>
                        <option>Judicial Layout</option>
                      </select>
                    </div>
                  </label>
                </div>
                <label>
                  <span>Confirm password</span>
                  <div
                    className={
                      error && password !== confirmPassword ? "field-error" : ""
                    }
                  >
                    <Icon name="shield" size={17} />
                    <input
                      autoComplete="new-password"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Enter the password again"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                    />
                  </div>
                </label>
              </>
            )}
            {error && (
              <div className="login-error">
                <Icon name="warning" size={15} /> {error}
              </div>
            )}
            <div className="login-options">
              <label className="remember-check">
                <input
                  checked={mode === "login" ? remember : acceptedTerms}
                  onChange={(event) =>
                    mode === "login"
                      ? setRemember(event.target.checked)
                      : setAcceptedTerms(event.target.checked)
                  }
                  type="checkbox"
                />
                <span>
                  <Icon name="check" size={12} />
                </span>
                {mode === "login"
                  ? "Keep me signed in on this device"
                  : "I agree to the prototype privacy notice"}
              </label>
              {mode === "login" && (
                <button type="button">Forgot password?</button>
              )}
            </div>
            <Button className="login-submit" icon={loading ? "clock" : "arrow"}>
              {loading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating profile..."
                : mode === "login"
                  ? "Sign in"
                  : "Create profile & continue"}
            </Button>
          </form>

          {mode === "login" && (
            <>
              <div className="login-divider">
                <span>or use demonstration access</span>
              </div>
              <button className="demo-login" onClick={useDemoAccount}>
                <span>
                  <Icon name="spark" size={18} />
                </span>
                <div>
                  <strong>
                    Fill demo {role === "community" ? "community" : "citizen"}{" "}
                    credentials
                  </strong>
                  <small>No real account required</small>
                </div>
                <Icon name="arrow" size={17} />
              </button>
            </>
          )}

          {role === "citizen" && (
            <p className="login-create">
              {mode === "login"
                ? "New to CommunityTwin?"
                : "Already have a profile?"}{" "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login")
                  setError("")
                  setLoading(false)
                }}
              >
                {mode === "login"
                  ? "Create a citizen profile"
                  : "Return to sign in"}
              </button>
            </p>
          )}
          <div className="login-footer-links">
            <button>Privacy</button>
            <i /> <button>Help centre</button>
            <i /> <button>Accessibility</button>
          </div>
        </div>
      </section>
    </main>
  )
}
