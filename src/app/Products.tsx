import { useMemo, useState } from 'react'
import { CarFront, Edit, Eye, Plus, Search, Truck, ArrowUpRight } from 'lucide-react'
import { formatCurrency } from '../shared/utils/format'
import type { Vehicle } from '../shared/data/vehicles'
import { vehicles, vehicleStatusLabel, vehicleStatusTone } from '../shared/data/vehicles'

export function ProductsPage({ onNotice }: { onNotice: (message: string) => void }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Vehicle['status'] | 'all'>('all')

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.sku.toLowerCase().includes(search.toLowerCase()) ||
        v.make.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="page-content products-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Inventory Management</p>
          <h1>Vehicles</h1>
          <p className="muted">Manage showroom inventory, pricing, and availability.</p>
        </div>
        <button className="primary-button" onClick={() => onNotice('Vehicle creation form is ready to connect to the API.')}>
          <Plus size={16} /> Add vehicle
          <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="inventory-controls" aria-label="Inventory filters">
        <div className="control-group">
          <label className="control-label">Search</label>
          <div className="control-input-wrapper">
            <Search size={14} className="control-icon" />
            <input
              className="control-input"
              type="search"
              placeholder="Search by name, SKU, or make..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search vehicles"
            />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Status</label>
          <select className="control-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Vehicle['status'] | 'all')}>
            <option value="all">All statuses</option>
            <option value="active">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </section>

      <section className="vehicle-grid" aria-label="Vehicle inventory">
        {filtered.length === 0 ? (
          <div className="empty-state panel">
            <div className="empty-state-icon"><CarFront size={24} /></div>
            <h2>No vehicles found</h2>
            <p>Try adjusting your search or status filter.</p>
            <button className="secondary-button" onClick={() => setSearch('')}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="vehicle-cards">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onNotice={onNotice} />
            ))}
          </div>
        )}
      </section>

      <section className="inventory-summary">
        <div className="summary-stat">
          <strong className="summary-value">{filtered.length}</strong>
          <span className="summary-label">vehicles in view</span>
        </div>
        <div className="summary-stat">
          <strong className="summary-value">{formatCurrency(sumByPrice(filtered))}</strong>
          <span className="summary-label">total inventory value</span>
        </div>
        <div className="summary-stat">
          <strong className="summary-value">{filtered.filter((v) => v.status === 'active').length}</strong>
          <span className="summary-label">available for sale</span>
        </div>
      </section>
    </div>
  )
}

function sumByPrice(items: Vehicle[]): number {
  return items.reduce((total, v) => total + v.priceCents, 0) / 100
}

function VehicleCard({ vehicle, onNotice }: { vehicle: Vehicle; onNotice: (message: string) => void }) {
  const tone = vehicleStatusTone(vehicle.status)
  return (
    <article className={`vehicle-card vehicle-card--${tone}`} data-testid={`vehicle-${vehicle.id}`}>
      <div className="vehicle-media">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.color}`}
          loading="lazy"
          width={260}
          height={160}
        />
        <div className={`vehicle-status-badge status--${tone}`}>
          {vehicleStatusLabel(vehicle.status)}
        </div>
        <div className="vehicle-actions">
          <button className="icon-button" title="View details" aria-label={`View ${vehicle.name} details`} onClick={() => onNotice(`Opening details for ${vehicle.name}`)}>
            <Eye size={16} />
          </button>
          <button className="icon-button" title="Edit vehicle" aria-label={`Edit ${vehicle.name}`} onClick={() => onNotice(`Edit form for ${vehicle.name} is ready to connect to the API.`)}>
            <Edit size={16} />
          </button>
        </div>
      </div>
      <div className="vehicle-info">
        <div className="vehicle-header">
          <div>
            <h3 className="vehicle-name">{vehicle.name}</h3>
            <span className="vehicle-sku">{vehicle.sku}</span>
          </div>
          <strong className="vehicle-price">{formatCurrency(vehicle.priceCents)}</strong>
        </div>
        <div className="vehicle-meta">
          <span>{vehicle.year} · {vehicle.color}</span>
          <span>{vehicle.engine}</span>
          <span>{vehicle.horsepower} hp</span>
        </div>
        <div className="vehicle-stock">
          <Truck size={14} />
          <span>{vehicle.stockQuantity} in stock</span>
        </div>
      </div>
    </article>
  )
}