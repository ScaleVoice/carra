export const URLS = {
  // common applications api endpoints
  tickingAdsSearch: '/ticking/ticking-app/ticking-ads/search',

  // mutation api endpoints
  editTickingAd: (tickingAdId: string) =>
    `/ticking/ticking-app/ticking-ads/${tickingAdId}`,
  tickingAdAction: (tickingAdId: string) =>
    `/ticking/ticking-app/ticking-ads/${tickingAdId}/action`,
  tickingAdNotes: (tickingAdId: string) =>
    `/ticking/ticking-app/ticking-ads/${tickingAdId}/notes`,
  updateSellerState: (tickingAdId: string, sellerId: string) =>
    `/ticking/ticking-app/ticking-ads/${tickingAdId}/seller/${sellerId}`,
  callResult: (tickingAdId: string) =>
    `/ticking/ticking-app/ticking-ads/${tickingAdId}/call-result`,

  // lov urls
  lovBodiesSearch: '/common-lovs/bodies/search',
  lovTransmissions: '/common-lovs/transmissions',
  lovFuelTypes: '/common-lovs/fuel-types',
  lovDrives: '/common-lovs/drives',
  lovCountries: '/common-lovs/countries',
  lovMakes: '/common-lovs/makes',
  lovMakesSearch: '/common-lovs/makes/search',
  lovModelsSearch: '/common-lovs/models/search',

  //custom next endpoints
  advertisement: '/api/advertisement'
}
