/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/lov/service-contractors/search': {
    post: operations['searchServiceContractors']
  }
  '/lov/partners/search': {
    post: operations['search']
  }
  '/lov/branches/search': {
    post: operations['getBranches']
  }
}

export interface components {
  schemas: {
    ServiceContractorFilter: {
      ids: string[]
      countryIds?: string[]
      active?: boolean
    }
    ServiceContractorResponse: {
      id: string
      name?: string
      active: boolean
      countryId?: string
    }
    SimplePageServiceContractorResponse: {
      content: components['schemas']['ServiceContractorResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    PartnersFilter: {
      ids: string[]
    }
    PartnerSearchResponse: {
      /** Format: uuid */
      id: string
      name: string
      type: 'INTERNAL' | 'EXTERNAL'
      countryCode: string
    }
    SimplePagePartnerSearchResponse: {
      content: components['schemas']['PartnerSearchResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    BranchFilter: {
      ids: string[]
      types: ('BRANCH' | 'SUPER_STORE')[]
      active?: boolean
      visible?: boolean
      buying?: boolean
      branchPickup?: boolean
      homeDelivery?: boolean
    }
    BranchFilterWrapper: {
      filter?: components['schemas']['BranchFilter']
    }
    BranchItemResponse: {
      id: string
      name?: string
      address?: string
      fullAddress?: string
      city?: string
      navigationUrl?: string
      photoUrl?: string
      postCodeId?: string
      countryId?: string
      lat: number
      lng?: number
      active: boolean
      visible?: boolean
      type: 'BRANCH' | 'SUPER_STORE'
      buying?: boolean
      branchPickup?: boolean
      homeDelivery?: boolean
      /** Format: int32 */
      handoverShiftHours: number
      openingHours: components['schemas']['BranchOpeningHourResponse'][]
      responsibleSuperStoreId?: string
      /** Format: int32 */
      popularity?: number
    }
    BranchOpeningHourResponse: {
      day:
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY'
        | 'SUNDAY'
      /** Format: HH:mm */
      from: string
      /** Format: HH:mm */
      to?: string
    }
    SimplePageBranchItemResponse: {
      content: components['schemas']['BranchItemResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages?: number
    }
  }
}

export interface operations {
  searchServiceContractors: {
    parameters: {
      query: {
        /** Zero-based page index (0..N) */
        page?: number
        /** The size of the page to be returned */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'X-Install-UUID'?: unknown
        'Accept-Language'?: unknown
        Accept?: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageServiceContractorResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['ServiceContractorFilter']
      }
    }
  }
  search: {
    parameters: {
      query: {
        /** Zero-based page index (0..N) */
        page?: number
        /** The size of the page to be returned */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'X-Install-UUID'?: unknown
        'Accept-Language'?: unknown
        Accept?: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePagePartnerSearchResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['PartnersFilter']
      }
    }
  }
  getBranches: {
    parameters: {
      query: {
        /** Zero-based page index (0..N) */
        page?: number
        /** The size of the page to be returned */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'X-Install-UUID'?: unknown
        'Accept-Language'?: unknown
        Accept?: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageBranchItemResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BranchFilterWrapper']
      }
    }
  }
}

export interface external {}
