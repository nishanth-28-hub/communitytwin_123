import { useState } from "react"
import type { Screen, TwinCategory } from "../../types"
import { Icon, Badge, Card, Button } from "../../components/common"
import { CitizenHeader, MobileNav, MunicipalShell } from "../../components/layout"
import { CivicMap } from "../../components/map/CivicMap"
import { twinLocations, twinCategoryMeta } from "../../constants/mockData"

export function DigitalTwinPage({
  onNavigate,
  municipalMode = false,
}: {
  onNavigate: (screen: Screen) => void
  municipalMode?: boolean
}) {
  const [selectedId, setSelectedId] = useState(twinLocations[1].id)
  const [query, setQuery] = useState("")
  const [zoom, setZoom] = useState(1)
  const [layers, setLayers] = useState<Record<TwinCategory, boolean>>({
    water: true,
    flood: true,
    waste: true,
    road: true,
    normal: true,
  })

  const visibleLocations = twinLocations.filter(
    (location) =>
      layers[location.category] &&
      `${location.name} ${location.zone} ${location.categoryLabel} ${location.id}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  const selectedLocation =
    visibleLocations.find((location) => location.id === selectedId) ??
    visibleLocations[0]

  const mapContent = (
    <main
      className={
        municipalMode
          ? "admin-main digital-twin-main"
          : "community-map-main digital-twin-main"
      }
    >
      <div className="map-page-heading">
        <div>
          <div className="eyebrow">COMMUNITY DIGITAL TWIN</div>
          <h1>Yelahanka community risk map</h1>
          <p>
            Interactive geographical prototype · Coordinates and predictions are
            simulated, not live municipal data.
          </p>
        </div>
        <Button
          icon="home"
          variant="secondary"
          onClick={() => onNavigate(municipalMode ? "overview" : "citizen")}
        >
          Back to overview
        </Button>
      </div>

      <section className="twin-risk-summary">
        <Card>
          <span className="risk-summary-icon risk-critical">
            <Icon name="warning" size={18} />
          </span>
          <div>
            <small>CRITICAL RISK</small>
            <strong>01 zone</strong>
            <p>Flood response required</p>
          </div>
        </Card>
        <Card>
          <span className="risk-summary-icon risk-water">
            <Icon name="layers" size={18} />
          </span>
          <div>
            <small>WATER STRESS</small>
            <strong>1,850</strong>
            <p>Residents potentially affected</p>
          </div>
        </Card>
        <Card>
          <span className="risk-summary-icon risk-active">
            <Icon name="pin" size={18} />
          </span>
          <div>
            <small>ACTIVE HOTSPOTS</small>
            <strong>05</strong>
            <p>Across four community zones</p>
          </div>
        </Card>
        <Card>
          <span className="risk-summary-icon risk-normal">
            <Icon name="check" size={18} />
          </span>
          <div>
            <small>STABLE LOCATIONS</small>
            <strong>01</strong>
            <p>No elevated risk detected</p>
          </div>
        </Card>
      </section>

      <Card className="twin-map-toolbar">
        <label className="map-search">
          <Icon name="search" size={18} />
          <input
            aria-label="Search digital twin"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search location, zone, category or ID"
            value={query}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <Icon name="close" size={15} />
            </button>
          )}
        </label>
        <div className="layer-toggles" aria-label="Map layer filters">
          {(Object.keys(twinCategoryMeta) as TwinCategory[]).map((key) => (
            <label className={`layer-${key}`} key={key}>
              <input
                checked={layers[key]}
                onChange={(event) =>
                  setLayers((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
                type="checkbox"
              />
              <i />
              <span>{twinCategoryMeta[key].label}</span>
            </label>
          ))}
        </div>
      </Card>

      <div className="map-results-summary">
        <span>
          Showing <strong>{visibleLocations.length}</strong> simulated locations
          · Zoom {Math.round(zoom * 100)}%
        </span>
        <span className="map-updated">
          <i /> Prototype refreshed just now
        </span>
      </div>

      {selectedLocation ? (
        <section className="full-map-layout twin-full-layout">
          <div className="full-map-canvas">
            <CivicMap
              markers={visibleLocations}
              onSelect={(location) => setSelectedId(location.id)}
              onZoomChange={setZoom}
              selectedId={selectedLocation.id}
              zoom={zoom}
            />
            <div className="map-result-count">
              <Icon name="layers" size={16} />
              {visibleLocations.length} locations visible
            </div>
          </div>
          <Card className="twin-detail-panel">
            <div className="twin-detail-head">
              <span
                className={`twin-category-icon pin-${selectedLocation.category}`}
              >
                <Icon
                  name={
                    selectedLocation.category === "normal" ? "check" : "warning"
                  }
                  size={19}
                />
              </span>
              <div>
                <small>{selectedLocation.id}</small>
                <h2>{selectedLocation.name}</h2>
                <p>
                  <Icon name="pin" size={14} /> {selectedLocation.zone}
                </p>
              </div>
              <Badge
                tone={
                  selectedLocation.risk === "Critical"
                    ? "red"
                    : selectedLocation.risk === "High"
                      ? "amber"
                      : selectedLocation.risk === "Normal"
                        ? "green"
                        : "blue"
                }
              >
                {selectedLocation.risk} risk
              </Badge>
            </div>
            <dl className="twin-detail-list">
              <div>
                <dt>Problem category</dt>
                <dd>{selectedLocation.categoryLabel}</dd>
              </div>
              <div>
                <dt>Description</dt>
                <dd>{selectedLocation.description}</dd>
              </div>
              <div>
                <dt>Date reported</dt>
                <dd>{selectedLocation.reported}</dd>
              </div>
              <div>
                <dt>Affected population estimate</dt>
                <dd>{selectedLocation.population}</dd>
              </div>
              <div>
                <dt>Sample coordinates</dt>
                <dd>
                  {selectedLocation.coordinates[0].toFixed(4)}° N,{" "}
                  {selectedLocation.coordinates[1].toFixed(4)}° E
                </dd>
              </div>
            </dl>
            <div className="twin-ai-card">
              <span>
                <Icon name="spark" size={18} />
              </span>
              <div>
                <small>AI PREDICTION · SIMULATED</small>
                <p>{selectedLocation.prediction}</p>
              </div>
            </div>
            <div className="twin-action-card">
              <small>RECOMMENDED ACTION</small>
              <p>{selectedLocation.action}</p>
            </div>
          </Card>
        </section>
      ) : (
        <Card className="map-empty">
          <span>
            <Icon name="layers" size={28} />
          </span>
          <h2>No map layers visible</h2>
          <p>Enable a category or clear your search to show locations.</p>
          <Button
            variant="secondary"
            onClick={() => {
              setQuery("")
              setLayers({
                water: true,
                flood: true,
                waste: true,
                road: true,
                normal: true,
              })
            }}
          >
            Show all layers
          </Button>
        </Card>
      )}
    </main>
  )

  if (municipalMode) {
    return (
      <MunicipalShell active="Live Digital Twin" onNavigate={onNavigate}>
        {mapContent}
      </MunicipalShell>
    )
  }

  return (
    <div className="citizen-app community-map-app">
      <CitizenHeader active="map" onNavigate={onNavigate} />
      {mapContent}
      <MobileNav active="map" onNavigate={onNavigate} />
    </div>
  )
}
