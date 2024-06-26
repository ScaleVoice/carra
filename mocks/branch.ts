import { Branch } from "@/api/useBranch"

export const mockBranch: Branch = {
  id: "123ABC",
  name: "Mock Location",
  address: "123 Mock Street",
  city: "Mockville",
  navigationUrl: "https://maps.mock.com/123ABC",
  photoUrl: "https://photos.mock.com/123ABC",
  postCodeId: "M1M 1M1",
  countryId: "CA",
  lat: 43.654,
  lng: -79.383,
  active: true,
  visible: true,
  type: "BRANCH",
  buying: true,
  branchPickup: true,
  homeDelivery: true,
  handoverShiftHours: 8,
  openingHours: [
    { day: "MONDAY", from: "09:00", to: "17:00" },
    { day: "TUESDAY", from: "09:00", to: "17:00" },
    { day: "WEDNESDAY", from: "09:00", to: "17:00" },
    { day: "THURSDAY", from: "09:00", to: "17:00" },
    { day: "FRIDAY", from: "09:00", to: "17:00" },
  ],
  responsibleSuperStoreId: "456XYZ",
  popularity: 4,
}

const mockBranch2: Branch = {
  id: "XYZ789",
  name: "Second Mock Location",
  address: "456 Mock Avenue",
  city: "Mockington",
  navigationUrl: "https://maps.mock.com/XYZ789",
  photoUrl: "https://photos.mock.com/XYZ789",
  postCodeId: "A1A 1A1",
  countryId: "US",
  lat: 34.052,
  lng: -118.243,
  active: true,
  visible: true,
  type: "SUPER_STORE",
  buying: true,
  branchPickup: false,
  homeDelivery: true,
  handoverShiftHours: 10,
  openingHours: [
    { day: "MONDAY", from: "09:00", to: "17:00" },
    { day: "TUESDAY", from: "09:00", to: "17:00" },
    { day: "WEDNESDAY", from: "09:00", to: "17:00" },
    { day: "THURSDAY", from: "09:00", to: "17:00" },
    { day: "FRIDAY", from: "09:00", to: "17:00" },
  ],
  responsibleSuperStoreId: "123ABC",
  popularity: 5,
}

export const mockBranches: Branch[] = [mockBranch, mockBranch2]
