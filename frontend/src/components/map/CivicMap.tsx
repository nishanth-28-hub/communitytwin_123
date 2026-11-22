import type { TwinLocation, TwinCategory } from "../../types"
import { Icon } from "../common"
import { twinLocations, twinCategoryMeta } from "../../constants/mockData"

export function CivicMap({
  compact = false,
  resolved = false,
  markers = twinLocations,
  selectedId,
  onSelect,
  zoom = 1,
  onZoomChange,
}: {
  compact?: boolean
  resolved?: boolean
  markers?: TwinLocation[]
  selectedId?: string
  onSelect?: (location: TwinLocation) => void
  zoom?: number
  onZoomChange?: (zoom: number) => void
}) {
  return (
    <div className={`civic-map ${compact ? "map-compact" : ""}`}>
      <div className="map-viewport" style={{ transform: `scale(${zoom})` }}>
        <div className="map-grid" />
        <svg className="roads" viewBox="0 0 900 500" preserveAspectRatio="none">
          <path d="M-30 320 C180 260 260 380 470 290 S710 120 950 180" />
          <path d="M120 -30 C170 120 130 220 240 550" />
          <path d="M610 -30 C570 150 700 250 640 550" />
          <path
            className="minor"
            d="M-20 120 C210 150 300 90 500 130 S700 280 940 330"
          />
          <path className="minor" d="M350 -20 C300 170 420 270 390 550" />
        </svg>
        <svg
          className="zone-boundaries"
          viewBox="0 0 900 500"
          preserveAspectRatio="none"
        >
          <path d="M15 45 305 30 360 235 190 310 20 250Z" />
          <path d="m305 30 315 28 48 206-308-29Z" />
          <path d="m668 58 220 38-10 295-250-30 40-97Z" />
          <path d="m20 250 170 60 438 51-20 128-588-5Z" />
        </svg>
        <div className="map-area area-one">
          Yelahanka
          <br />
          <span>New Town</span>
        </div>
        <div className="map-area area-two">Attur</div>
        <div className="map-area area-three">Kogilu</div>
        {markers.map((marker, index) => (
          <button
            aria-label={`${marker.categoryLabel} at ${marker.name}`}
            className={`map-pin pin-${
              resolved && index === 0 ? "normal" : marker.category
            } ${marker.id === selectedId ? "pin-active pin-selected" : ""}`}
            key={marker.id}
            onClick={() => onSelect?.(marker)}
            style={{ left: marker.left, top: marker.top }}
          >
            <Icon
              name={
                marker.category === "normal" || (resolved && index === 0)
                  ? "check"
                  : marker.category === "water"
                    ? "layers"
                    : "warning"
              }
              size={13}
            />
          </button>
        ))}
      </div>
      <div className="map-controls">
        <button
          aria-label="Zoom in"
          onClick={() => onZoomChange?.(Math.min(1.35, zoom + 0.1))}
        >
          +
        </button>
        <button
          aria-label="Zoom out"
          onClick={() => onZoomChange?.(Math.max(0.85, zoom - 0.1))}
        >
          −
        </button>
        <button aria-label="Use current location">
          <Icon name="pin" size={17} />
        </button>
      </div>
      {!compact && (
        <div className="map-legend">
          <strong>MAP LAYERS</strong>
          {(Object.keys(twinCategoryMeta) as TwinCategory[]).map((key) => (
            <span key={key}>
              <i className={`legend-${key}`} /> {twinCategoryMeta[key].label}
            </span>
          ))}
        </div>
      )}
      <div className="map-attribution">OpenStreetMap-style prototype</div>
      <div className="sample-label">SIMULATED GEOGRAPHICAL DATA</div>
    </div>
  )
}
