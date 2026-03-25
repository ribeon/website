export interface Region {
  id: string
  name: string
  commodities: string[]
  bounds: [[number, number], [number, number]] // [[south, west], [north, east]]
  description: string
}

export const REGIONS: Region[] = [
  {
    id: 'us_corn_belt',
    name: 'US Corn Belt',
    commodities: ['ZC', 'ZS'],
    bounds: [[36, -104], [48, -80]],
    description: 'Primary corn and soybean growing region',
  },
  {
    id: 'brazil_soy',
    name: 'Brazil Soy',
    commodities: ['ZS'],
    bounds: [[-30, -60], [-5, -44]],
    description: 'Mato Grosso and Goiás soybean belt',
  },
  {
    id: 'us_northeast',
    name: 'US Northeast',
    commodities: ['NG'],
    bounds: [[37, -80], [47, -67]],
    description: 'High natural gas demand region',
  },
  {
    id: 'us_southern_plains',
    name: 'US Southern Plains',
    commodities: ['ZW', 'NG'],
    bounds: [[30, -104], [40, -94]],
    description: 'Winter wheat and natural gas region',
  },
  {
    id: 'eu_wheat_belt',
    name: 'EU Wheat Belt',
    commodities: ['ZW'],
    bounds: [[43, -2], [54, 24]],
    description: 'France, Germany, Poland wheat region',
  },
  {
    id: 'black_sea',
    name: 'Black Sea',
    commodities: ['ZW'],
    bounds: [[44, 22], [54, 42]],
    description: 'Ukraine and Russia wheat export corridor',
  },
  {
    id: 'argentine_pampas',
    name: 'Argentine Pampas',
    commodities: ['ZS', 'ZC'],
    bounds: [[-39, -65], [-28, -57]],
    description: 'Core soy and corn production area',
  },
  {
    id: 'australia_wheat',
    name: 'Australia Wheat',
    commodities: ['ZW'],
    bounds: [[-38, 140], [-24, 154]],
    description: 'Queensland and New South Wales wheat belt',
  },
]
