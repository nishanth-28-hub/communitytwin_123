import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Badge, Card, Button } from "../../components/common"
import { MunicipalShell } from "../../components/layout"
import { issueImage, repairImage } from "../../constants/assets"

export function Verification({
  onNavigate,
}: {
  onNavigate: (screen: Screen) => void
}) {
  const [approved, setApproved] = useState(false)
  return (
    <MunicipalShell active="Resolution Verification" onNavigate={onNavigate}>
      <main className="admin-main verification-main">
        <div className="admin-heading">
          <div>
            <div className="eyebrow">QUALITY CONTROL</div>
            <h1>Resolution Verification</h1>
            <p>Review repair evidence before closing the master ticket.</p>
          </div>
          <div className="heading-actions">
            <Badge tone={approved ? "green" : "amber"}>
              {approved ? "Verified resolved" : "Awaiting review"}
            </Badge>
            <span className="ticket-id">CT-2025-0418</span>
          </div>
        </div>
        {approved && (
          <div className="approved-banner">
            <Icon name="check" size={20} />
            <div>
              <strong>Resolution approved</strong>
              <p>
                The master ticket is resolved and its digital twin marker is now
                green.
              </p>
            </div>
            <button onClick={() => onNavigate("overview")}>
              View updated map <Icon name="arrow" size={15} />
            </button>
          </div>
        )}
        <section className="verification-grid">
          <div className="verification-content">
            <Card className="comparison-card">
              <div className="comparison-head">
                <div>
                  <h2>Repair evidence</h2>
                  <p>Side-by-side visual inspection</p>
                </div>
                <div className="view-switch">
                  <button className="active">Side by side</button>
                  <button>Slider</button>
                </div>
              </div>
              <div className="images-compare">
                <div>
                  <span className="image-label before">
                    BEFORE · 24 FEB, 08:42
                  </span>
                  <img src={issueImage} alt="Road issue before repair" />
                  <button>
                    <Icon name="search" size={17} /> Inspect image
                  </button>
                </div>
                <div>
                  <span className="image-label after">
                    AFTER · 25 FEB, 16:18
                  </span>
                  <img src={repairImage} alt="Sample road after field work" />
                  <button>
                    <Icon name="search" size={17} /> Inspect image
                  </button>
                </div>
              </div>
              <div className="evidence-meta">
                <span>
                  <Icon name="user" size={16} />
                  <b>Submitted by</b> Manjunath K. · RoadCare-02
                </span>
                <span>
                  <Icon name="clock" size={16} />
                  <b>Completion</b> 25 Feb 2025, 16:18
                </span>
                <span>
                  <Icon name="pin" size={16} />
                  <b>Distance</b> 4 m from issue pin
                </span>
              </div>
            </Card>
            <Card className="ai-verification">
              <div className="ai-verification-head">
                <div className="formula-icon">
                  <Icon name="spark" />
                </div>
                <div>
                  <small>AI-ASSISTED COMPARISON</small>
                  <h2>Visual change detected</h2>
                  <p>Illustrative SSIM/SIFT-assisted summary</p>
                </div>
                <Badge tone="amber">Manual review needed</Badge>
              </div>
              <div className="verification-scores">
                <div>
                  <span>Structural similarity (SSIM)</span>
                  <strong>0.42</strong>
                  <small>Substantial visual change</small>
                  <i>
                    <b style={{ width: "58%" }} />
                  </i>
                </div>
                <div>
                  <span>Feature match reduction (SIFT)</span>
                  <strong>76%</strong>
                  <small>Defect-region features reduced</small>
                  <i>
                    <b style={{ width: "76%" }} />
                  </i>
                </div>
                <div>
                  <span>Image quality check</span>
                  <strong>Good</strong>
                  <small>Clear, well-lit evidence</small>
                  <i>
                    <b style={{ width: "91%" }} />
                  </i>
                </div>
              </div>
              <div className="ai-caution">
                <Icon name="shield" size={18} />
                <p>
                  <strong>Decision support, not proof.</strong> Similarity
                  scores indicate visual change but cannot independently confirm
                  a safe repair. Inspect both images and field notes.
                </p>
              </div>
            </Card>
            <Card className="notes-card">
              <h2>Verification notes</h2>
              <textarea
                aria-label="Verification notes"
                placeholder="Add observations for the audit history..."
                defaultValue="Surface appears level and the defect area is fully covered. Road markings remain visible."
              />
            </Card>
          </div>
          <aside className="verification-sidebar">
            <Card className="ticket-summary">
              <div className="ticket-summary-head">
                <div>
                  <small>MASTER TICKET</small>
                  <h2>CT-2025-0418</h2>
                </div>
                <button>
                  <Icon name="more" />
                </button>
              </div>
              <h3>Large pothole near school crossing</h3>
              <p>
                <Icon name="pin" size={15} /> 4th Main Road, Yelahanka New Town
              </p>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>Pothole</dd>
                </div>
                <div>
                  <dt>Priority</dt>
                  <dd>
                    <Badge tone="red">Critical · 88.4</Badge>
                  </dd>
                </div>
                <div>
                  <dt>Supporting reports</dt>
                  <dd>13 citizens</dd>
                </div>
                <div>
                  <dt>Assigned team</dt>
                  <dd>RoadCare-02</dd>
                </div>
                <div>
                  <dt>Repair duration</dt>
                  <dd>6h 24m</dd>
                </div>
              </dl>
            </Card>
            <Card className="decision-card">
              <div className="decision-icon">
                <Icon name="shield" size={24} />
              </div>
              <h2>{approved ? "Resolution approved" : "Make a decision"}</h2>
              <p>
                {approved
                  ? "The audit history has been updated."
                  : "Approval closes the ticket and turns the digital twin map marker green."}
              </p>
              {!approved ? (
                <>
                  <Button icon="check" onClick={() => setApproved(true)}>
                    Approve resolution
                  </Button>
                  <Button variant="danger" icon="warning">
                    Request reinspection
                  </Button>
                  <Button variant="quiet">Save notes for later</Button>
                </>
              ) : (
                <Button icon="map" onClick={() => onNavigate("overview")}>
                  View on digital twin
                </Button>
              )}
            </Card>
            <Card className="audit-mini">
              <h3>Verification history</h3>
              <div>
                <i />
                <span>
                  <strong>Evidence uploaded</strong>
                  <small>25 Feb · 16:18 · Manjunath K.</small>
                </span>
              </div>
              <div>
                <i />
                <span>
                  <strong>Repair started</strong>
                  <small>25 Feb · 09:54 · RoadCare-02</small>
                </span>
              </div>
              <button>
                View complete audit trail <Icon name="arrow" size={15} />
              </button>
            </Card>
          </aside>
        </section>
      </main>
    </MunicipalShell>
  )
}
