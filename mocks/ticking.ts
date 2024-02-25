import { TickingItem } from 'sections/tickingList/table/TickingListTable.utils'

const seller = {
  id: 'seller_id',
  name: 'Seller'
}

const state = {
  phase: 'NEW_AD'
}

const notes = [
  // Fill in mock data for TickingAdNoteResponse objects
  {
    content: 'This is a mock content',
    createdAt: '2024-02-18T12:00:00Z',
    createdByEmployeeId: 'employee123'
  }
]

const mockTickingAdItem: TickingItem = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  adNo: 'AD123456',
  createdAt: '2024-02-18T12:00:00Z',
  updatedAt: '2024-02-18T12:00:00Z',
  downloadedAt: '2024-02-18T12:00:00Z',
  serverId: 1,
  adUrl: 'https://example.com/ad',
  makeId: 'make123',
  modelId: 'model456',
  transmissionId: 'trans123',
  driveId: 'drive456',
  bodyId: 'body123',
  fuelId: 'fuel456',
  speedometerMileageKm: 10000,
  yearOfMake: 2020,
  powerKw: 120,
  volumeCcm: 2000,
  profit: 5000,
  expectedPrice: 25000,
  recommendedBuyingPrice: 20000,
  maxBuyingPrice: 18000,
  predictedPrice: 23000,
  retailPrice: 26000,
  tradePrice: 22000,
  currency: 'USD',
  webPosition: 1,
  webPositionLevel: 1,
  webPositionPriceList: [20000, 21000, 22000],
  retailStockTurnover: 5,
  retailStockTurnoverLevel: 2,
  wholesaleStockTurnover: 3,
  wholesaleStockTurnoverLevel: 1,
  marketStockTurnover: 7,
  marketStockTurnoverLevel: 3,
  ads: 'This is a mock ad',
  rank: 3,
  carGrade: 2,
  marketMonitoringCode: 'MON123',
  marketMonitoringUrl: 'https://example.com/monitoring',
  pricingAppUrl: 'https://example.com/pricing',
  kpisRefetchState: 'IN_PROGRESS',
  seller,
  notes,
  //@ts-ignore
  state
}

export const mockTickingAdSearchResponse = {
  content: [mockTickingAdItem, mockTickingAdItem, mockTickingAdItem],
  totalPages: 3,
  totalElements: 3
}
