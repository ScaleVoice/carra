const bodyTypeMock = {
  id: "bodyId",
  active: true,
  name: "body-1",
  code: "body-1-code",
}

export const bodySearchResponseMock = {
  content: [bodyTypeMock],
  totalPages: 1,
  totalElements: 1,
}

const fuelTypeMock = {
  id: "fuelTypeId",
  active: true,
  preferredPrimaryFuelTypeIds: ["preferredPrimaryFuelTypeId-1"],
  name: "fuelType-1",
}

export const fuelSearchResponseMock = {
  content: [fuelTypeMock],
  totalPages: 1,
  totalElements: 1,
}

const transmissionMock = {
  id: "transmissionId",
  active: true,
  name: "transmission-1",
}

export const transmissionSearchResponseMock = {
  content: [transmissionMock],
  totalPages: 1,
  totalElements: 1,
}

const makeMock = {
  id: "make123",
  name: "Mock Make",
  active: true,
  featured: true,
  popularity: 10,
  svgIcon: "https://example.com/icon.svg",
}

const makeMock2 = {
  id: "make456",
  name: "Mock Make 2",
  active: true,
  featured: true,
  popularity: 5,
  svgIcon: "https://example.com/icon2.svg",
}

export const makeSearchResponseMock = {
  content: [makeMock, makeMock2],
  totalPages: 1,
  totalElements: 1,
}

const modelItemMock = {
  id: "model123",
  name: "Mock Model",
  makeId: "make123",
  active: true,
  featured: false,
  yearFrom: 2010,
  yearTo: 2022,
  carTypeId: "carType456",
}

export const modelSearchResponseMock = {
  content: [modelItemMock],
  totalPages: 1,
  totalElements: 1,
}
