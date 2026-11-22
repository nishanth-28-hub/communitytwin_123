export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <div className="logo-mark">
        <span />
        <span />
        <span />
      </div>
      {!compact && (
        <div>
          <strong>CommunityTwin</strong>
          <small>SMART CIVIC NETWORK</small>
        </div>
      )}
    </div>
  )
}
