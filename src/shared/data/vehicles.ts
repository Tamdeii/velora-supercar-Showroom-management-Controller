export type Vehicle = {
  id: string
  name: string
  sku: string
  priceCents: number
  stockQuantity: number
  status: 'active' | 'sold' | 'reserved' | 'maintenance'
  year: number
  make: string
  model: string
  color: string
  engine: string
  horsepower: number
  image: string
}

export const vehicles: Vehicle[] = [
  {
    id: 'veh-1',
    name: 'Velora V1 Carbon Edition',
    sku: 'VEL-V1-CE-2026',
    priceCents: 1_850_000,
    stockQuantity: 3,
    status: 'active',
    year: 2026,
    make: 'Velora',
    model: 'V1',
    color: 'Carbon Black',
    engine: 'Twin-Turbo V8',
    horsepower: 720,
    image: '/assets/vehicles/v1-carbon.jpg',
  },
  {
    id: 'veh-2',
    name: 'Velora GT Track Package',
    sku: 'VEL-GT-TP-2026',
    priceCents: 1_320_000,
    stockQuantity: 5,
    status: 'active',
    year: 2026,
    make: 'Velora',
    model: 'GT',
    color: 'Sonata Gold',
    engine: 'Twin-Turbo V6',
    horsepower: 580,
    image: '/assets/vehicles/gt-track.jpg',
  },
  {
    id: 'veh-3',
    name: 'Velora XS Spider',
    sku: 'VEL-XS-SP-2025',
    priceCents: 2_100_000,
    stockQuantity: 2,
    status: 'reserved',
    year: 2025,
    make: 'Velora',
    model: 'XS',
    color: 'Midnight Blue',
    engine: 'Naturally Aspirated V12',
    horsepower: 850,
    image: '/assets/vehicles/xs-spider.jpg',
  },
  {
    id: 'veh-4',
    name: 'Velora V1 Carbon Edition',
    sku: 'VEL-V1-CE-2025',
    priceCents: 1_780_000,
    stockQuantity: 1,
    status: 'sold',
    year: 2025,
    make: 'Velora',
    model: 'V1',
    color: 'Arctic Silver',
    engine: 'Twin-Turbo V8',
    horsepower: 700,
    image: '/assets/vehicles/v1-silver.jpg',
  },
  {
    id: 'veh-5',
    name: 'Velora Hyper R',
    sku: 'VEL-HR-ONE-2026',
    priceCents: 3_400_000,
    stockQuantity: 1,
    status: 'maintenance',
    year: 2026,
    make: 'Velora',
    model: 'Hyper R',
    color: 'Velora Red',
    engine: 'Hybrid V8 + Electric',
    horsepower: 1_100,
    image: '/assets/vehicles/hyper-r.jpg',
  },
]

export function vehicleStatusLabel(status: Vehicle['status']): string {
  const labels: Record<Vehicle['status'], string> = {
    active: 'Available',
    sold: 'Sold',
    reserved: 'Reserved',
    maintenance: 'Maintenance',
  }
  return labels[status]
}

export function vehicleStatusTone(status: Vehicle['status']): 'green' | 'gray' | 'orange' | 'blue' {
  const tones: Record<Vehicle['status'], 'green' | 'gray' | 'orange' | 'blue'> = {
    active: 'green',
    sold: 'gray',
    reserved: 'orange',
    maintenance: 'blue',
  }
  return tones[status]
}