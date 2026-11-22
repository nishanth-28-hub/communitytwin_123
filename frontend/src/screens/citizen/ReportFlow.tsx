import { useState } from "react"
import type { Screen } from "../../types"
import { Icon, Logo, Badge, Card, Button, SectionTitle } from "../../components/common"
import { CivicMap } from "../../components/map/CivicMap"
import { reportSteps } from "../../constants/mockData"
import { issueImage } from "../../constants/assets"

export function ReportFlow({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const next = () => (step < 4 ? setStep(step + 1) : setSubmitted(true))
  return (
    <div className="report-app">
      <header className="report-header">
        <Logo />
        <button className="close-report" onClick={() => onNavigate("citizen")}>
          <Icon name="close" /> Save & exit
        </button>
      </header>
      <main className="report-main">
        {!submitted ? (
          <>
            <div className="report-heading">
              <div className="eyebrow">NEW CIVIC REPORT</div>
              <h1>Report an issue</h1>
              <p>Share what you found. We’ll guide you through each step.</p>
            </div>
            <div className="stepper">
              {reportSteps.map((label, index) => (
                <div
                  className={`${index === step ? "current" : ""} ${
                    index < step ? "complete" : ""
                  }`}
                  key={label}
                >
                  <span>
                    {index < step ? <Icon name="check" size={15} /> : index + 1}
                  </span>
                  <small>{label}</small>
                </div>
              ))}
              <i style={{ width: `${step * 25}%` }} />
            </div>
            <div className="report-layout">
              <Card className="report-panel">
                {step === 0 && (
                  <div className="step-content">
                    <SectionTitle
                      eyebrow="STEP 1 OF 5"
                      title="Show us the issue"
                      detail="Take a clear photo that shows the issue and its surroundings."
                    />
                    <button className="upload-zone" onClick={next}>
                      <span>
                        <Icon name="camera" size={30} />
                      </span>
                      <strong>Take a photo or upload one</strong>
                      <small>JPG or PNG · Up to 10 MB</small>
                      <b>Choose photo</b>
                    </button>
                    <div className="photo-tips">
                      <strong>For the best result</strong>
                      <span>
                        <Icon name="check" size={16} /> Include the full issue
                        in frame
                      </span>
                      <span>
                        <Icon name="check" size={16} /> Photograph in good
                        lighting
                      </span>
                      <span>
                        <Icon name="check" size={16} /> Stay safe and avoid
                        traffic
                      </span>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="step-content">
                    <SectionTitle
                      eyebrow="STEP 2 OF 5"
                      title="AI-assisted analysis"
                      detail="Review the sample model output before continuing."
                    />
                    <div className="analysis-grid">
                      <div className="detection-photo">
                        <img
                          src={issueImage}
                          alt="Uploaded sample road issue"
                        />
                        <div className="bounding-box">
                          <span>Pothole · 92%</span>
                        </div>
                      </div>
                      <div className="analysis-results">
                        <div className="ai-label">
                          <Icon name="spark" size={17} /> ILLUSTRATIVE YOLOv8
                          OUTPUT
                        </div>
                        <dl>
                          <div>
                            <dt>Detected category</dt>
                            <dd>Pothole</dd>
                          </div>
                          <div>
                            <dt>Estimated severity</dt>
                            <dd>
                              <Badge tone="red">High</Badge>
                            </dd>
                          </div>
                          <div>
                            <dt>Confidence</dt>
                            <dd>92%</dd>
                          </div>
                        </dl>
                        <div className="confidence">
                          <span style={{ width: "92%" }} />
                        </div>
                        <p>
                          <Icon name="warning" size={17} /> AI-generated sample
                          result. You can correct the category or severity
                          before submitting.
                        </p>
                        <button className="edit-analysis">Edit analysis</button>
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="step-content">
                    <SectionTitle
                      eyebrow="STEP 3 OF 5"
                      title="Confirm the location"
                      detail="We found an approximate location. Drag the pin if needed."
                    />
                    <div className="location-map">
                      <CivicMap compact />
                      <div className="location-pin">
                        <Icon name="pin" size={26} />
                      </div>
                    </div>
                    <div className="location-fields">
                      <label>
                        <span>Address</span>
                        <input
                          value="4th Main Road, Yelahanka New Town"
                          readOnly
                        />
                      </label>
                      <label>
                        <span>Coordinates</span>
                        <input value="13.1007° N, 77.5963° E" readOnly />
                      </label>
                    </div>
                    <div className="permission-note">
                      <Icon name="pin" size={17} />
                      <span>
                        <strong>Location estimated from device GPS.</strong> If
                        GPS or photo metadata is unavailable, place the pin
                        manually.
                      </span>
                      <Button variant="quiet">Use current location</Button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="step-content">
                    <SectionTitle
                      eyebrow="STEP 4 OF 5"
                      title="A nearby report may match"
                      detail="We found one active master ticket within 15 metres."
                    />
                    <div className="duplicate-banner">
                      <Icon name="layers" size={22} />
                      <div>
                        <strong>Possible duplicate detected · 8 m away</strong>
                        <p>
                          DBSCAN-based spatial grouping suggestion — please
                          confirm visually.
                        </p>
                      </div>
                    </div>
                    <div className="duplicate-card">
                      <img src={issueImage} alt="Existing issue sample" />
                      <div>
                        <div>
                          <Badge tone="red">Critical</Badge>
                          <span className="ticket-id">CT-2025-0418</span>
                        </div>
                        <h3>Large pothole near school crossing</h3>
                        <p>
                          <Icon name="pin" size={15} /> 4th Main Road, Yelahanka
                          New Town
                        </p>
                        <div className="supporters">
                          <span>12</span> citizen reports already support this
                          issue
                        </div>
                      </div>
                    </div>
                    <div className="match-actions">
                      <Button icon="layers" onClick={next}>
                        Support existing issue
                      </Button>
                      <Button variant="secondary" onClick={next}>
                        This is a different issue
                      </Button>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="step-content">
                    <SectionTitle
                      eyebrow="STEP 5 OF 5"
                      title="Review and submit"
                      detail="Confirm the details below. Your report will support the existing master ticket."
                    />
                    <div className="review-card">
                      <img src={issueImage} alt="Report preview" />
                      <div>
                        <Badge tone="red">High severity</Badge>
                        <h3>Pothole</h3>
                        <p>
                          Large road defect near the school crossing. Requires
                          urgent inspection.
                        </p>
                      </div>
                    </div>
                    <div className="review-details">
                      <div>
                        <small>MASTER TICKET</small>
                        <strong>CT-2025-0418</strong>
                      </div>
                      <div>
                        <small>LOCATION</small>
                        <strong>4th Main Road, Yelahanka</strong>
                      </div>
                      <div>
                        <small>SUPPORTING REPORTS</small>
                        <strong>12 → 13 after submission</strong>
                      </div>
                      <div>
                        <small>INITIAL STATUS</small>
                        <strong>Under municipal review</strong>
                      </div>
                    </div>
                    <div className="honesty-note">
                      <Icon name="shield" size={19} />
                      <p>
                        This prototype demonstrates the intended workflow. AI,
                        clustering, GPS and municipal integrations are
                        represented with sample outputs.
                      </p>
                    </div>
                  </div>
                )}
                <div className="report-footer">
                  <Button
                    variant="quiet"
                    onClick={() =>
                      step > 0 ? setStep(step - 1) : onNavigate("citizen")
                    }
                  >
                    {step > 0 ? "Back" : "Cancel"}
                  </Button>
                  <span>Step {step + 1} of 5</span>
                  <Button icon={step === 4 ? "check" : "arrow"} onClick={next}>
                    {step === 4 ? "Submit report" : "Continue"}
                  </Button>
                </div>
              </Card>
              <aside className="report-aside">
                <div className="aside-callout">
                  <Icon name="shield" size={22} />
                  <div>
                    <strong>Your safety comes first</strong>
                    <p>
                      Never step into traffic or unsafe areas to take a photo.
                    </p>
                  </div>
                </div>
                <div className="aside-help">
                  <strong>Need help?</strong>
                  <p>
                    Learn how reports are reviewed and how your data is used.
                  </p>
                  <button>
                    Reporting guide <Icon name="arrow" size={15} />
                  </button>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <Card className="success-card">
            <div className="success-mark">
              <Icon name="check" size={32} />
            </div>
            <div className="eyebrow">REPORT SUBMITTED</div>
            <h1>Thank you for helping Yelahanka.</h1>
            <p>
              Your report now supports an existing master ticket. You’ll receive
              updates as the municipal team reviews and repairs the issue.
            </p>
            <div className="ticket-confirm">
              <small>MASTER TICKET</small>
              <strong>CT-2025-0418</strong>
              <Badge tone="amber">Under review</Badge>
            </div>
            <div className="next-steps">
              <span>
                <b>13</b> supporting reports
              </span>
            </div>
            <Button onClick={() => onNavigate("citizen")}>
              View ticket details
            </Button>
            <button
              className="text-action"
              onClick={() => onNavigate("citizen")}
            >
              Return to dashboard
            </button>
          </Card>
        )}
      </main>
    </div>
  )
}
