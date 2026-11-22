import { Icon } from "./Icon"

export function SearchField({ placeholder = "Search" }: { placeholder?: string }) {
  return (
    <label className="search-field">
      <Icon name="search" size={18} />
      <input aria-label={placeholder} placeholder={placeholder} />
    </label>
  )
}
