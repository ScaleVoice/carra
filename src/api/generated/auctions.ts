/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/auctions/{auctionId}/bids': {
    put: operations['createOrUpdateBid']
  }
  '/auctions/{auctionId}/diff': {
    post: operations['resolvePreviousAuctionDiff']
  }
  '/auctions/search': {
    post: operations['searchAuctions']
  }
  '/auctions/search-agg': {
    post: operations['searchAuctionsAgg']
  }
  '/auctions/bids/search': {
    post: operations['searchBids']
  }
  '/admin/auctions/{auctionId}/start': {
    post: operations['startAuction']
  }
  '/admin/auctions/{auctionId}/end': {
    post: operations['endAuction']
  }
  '/admin/auctions/{auctionId}/change-winner': {
    post: operations['changeWinner']
  }
  '/admin/auctions/search': {
    post: operations['searchAuctions_1']
  }
  '/admin/auctions/recreate': {
    post: operations['recreateAuction']
  }
  '/admin/auctions/{auctionId}': {
    get: operations['getAuction']
  }
}

export interface components {
  schemas: {
    CreateOrUpdateAuctionBidRequest: {
      price: number
      sellingPrice?: number | null
      sellingPriceCurrencyCode?: ('EUR' | 'CZK' | 'PLN') | null
      bidderId?: string | null
      partnerId: string
    }
    AuctionBidResponse: {
      /** Format: uuid */
      id: string
      /** Format: uuid */
      auctionId: string
      partnerId: string
      bidderId?: string | null
      price: number
      fee: number
      isWin: boolean
      updatedPrice?: number | null
      state: 'VALID' | 'INVALID'
      sellingPrice?: number | null
      sellingPriceCurrencyCode?: ('EUR' | 'CZK' | 'PLN') | null
      /** Format: date-time */
      createdAt: string
      /** Format: date-time */
      updatedAt: string
    }
    PreviousAuctionDiffRequest: {
      /** Format: uuid */
      previousAuctionId: string
    }
    AuctionSnapshotDiffModel: {
      propertyName: string
      changeType:
        | 'VALUE_ADDED'
        | 'VALUE_REMOVED'
        | 'VALUE_CHANGED'
        | 'ARRAY_ELEMENT_ADDED'
        | 'ARRAY_ELEMENT_REMOVED'
        | 'UNKNOWN_CHANGE_TYPE'
      oldValue?: string | null
      newValue?: string | null
    }
    AuctionsFilter: {
      ids?: string[]
      carIds?: string[]
      types?: ('REGULAR' | 'REPEATED' | 'SEEN')[]
      states?: (
        | 'READY_TO_START'
        | 'IN_PROGRESS'
        | 'SUCCESSFUL'
        | 'FAILED'
        | 'CANCELLED'
        | 'SUCCESSFUL_WINNER_CHANGED'
      )[]
      opportunitySources?: (
        | 'E_COMMERCE'
        | 'WALK_IN'
        | 'TICKING'
        | 'IN_CALL'
        | 'PROACTIVITY'
        | 'B2B'
      )[]
      excludedOpportunityStates?: (
        | 'CAR_BASIC_INFO'
        | 'MISSING_CAR_DATA'
        | 'CAR_FEATURES'
        | 'CAR_CONDITION'
        | 'CAR_QUICKPRICE'
        | 'APP_READY'
        | 'APP_IN_PROGRESS'
        | 'APP_QUICKPRICING'
        | 'APP_FULLPRICING'
        | 'PRICE_GUARANTEE'
        | 'LOST'
        | 'AGREED'
        | 'DEAL'
        | 'APPROVED'
        | 'DISCARDED'
      )[]
      opportunityStates?: (
        | 'CAR_BASIC_INFO'
        | 'MISSING_CAR_DATA'
        | 'CAR_FEATURES'
        | 'CAR_CONDITION'
        | 'CAR_QUICKPRICE'
        | 'APP_READY'
        | 'APP_IN_PROGRESS'
        | 'APP_QUICKPRICING'
        | 'APP_FULLPRICING'
        | 'PRICE_GUARANTEE'
        | 'LOST'
        | 'AGREED'
        | 'DEAL'
        | 'APPROVED'
        | 'DISCARDED'
      )[]
      carMakeIds?: string[]
      carModelIds?: string[]
      /** Format: int32 */
      carYearOfMakeFrom?: number
      /** Format: int32 */
      carYearOfMakeTo?: number
      /** Format: int32 */
      carSpeedometerMileageKmFrom?: number
      /** Format: int32 */
      carSpeedometerMileageKmTo?: number
      carVin?: string
      carLicensePlate?: string
      winningPartnerErpIds?: string[]
      opportunityBuyerIds?: string[]
      opportunityLossReasons?: (
        | 'CANCELLED_WITHOUT_REASON'
        | 'NO_INTEREST'
        | 'SEEN_PRICE_DIFFERENCE'
        | 'EXPIRED_PRICE_GUARANTEE'
        | 'NO_SHOW'
        | 'DUPLICITY'
        | 'NOT_RELEVANT'
        | 'FINAL_STAGE'
        | 'CAR_ALREADY_SOLD'
        | 'CALL_BACK'
        | 'SEEN_NO_INTEREST'
        | 'ONLY_INFO'
        | 'NOT_REACHED'
      )[]
      opportunityBranchIds?: string[]
      customerWishedPriceDifferenceTo?: number
    }
    AddressResponse: {
      address: string
      postCode: string
      town: string
    }
    AppointmentResponse: {
      location: 'MOBILE' | 'BRANCH'
      /** Format: date */
      date: string
      /** Format: HH:mm */
      timeLocal?: string | null
      address?: components['schemas']['AddressResponse']
      branchId?: string | null
      /** Format: date-time */
      startedAt?: string | null
    }
    AuctionBidSearchResponse: {
      price: number
      fee: number
      isWin: boolean
      partnerErpId: string
      bidderId?: string | null
      updatedPrice?: number | null
    }
    AuctionPartnerBidResponse: {
      /** Format: uuid */
      id: string
      partnerId: string
      price: number
    }
    AuctionSearchResponse: {
      /** Format: uuid */
      id: string
      /** Format: uuid */
      carId: string
      type: 'REGULAR' | 'REPEATED' | 'SEEN'
      state:
        | 'READY_TO_START'
        | 'IN_PROGRESS'
        | 'SUCCESSFUL'
        | 'FAILED'
        | 'CANCELLED'
        | 'SUCCESSFUL_WINNER_CHANGED'
      /** Format: date-time */
      plannedEndAt?: string | null
      /** Format: date-time */
      createdAt: string
      /** Format: date-time */
      startedAt?: string | null
      validBids: components['schemas']['AuctionPartnerBidResponse'][]
      winningBid?: components['schemas']['AuctionBidSearchResponse']
      previousAuctionWinningBid?: components['schemas']['AuctionBidSearchResponse']
      opportunity?: components['schemas']['OpportunityResponse']
    }
    BpmResponse: {
      calculationState: 'OK' | 'FAILED'
      grossAmountEur?: number | null
      reclaimAmountEur?: number | null
      monthlyReductionAmountEur?: number | null
    }
    OpportunityResponse: {
      state?:
        | (
            | 'CAR_BASIC_INFO'
            | 'MISSING_CAR_DATA'
            | 'CAR_FEATURES'
            | 'CAR_CONDITION'
            | 'CAR_QUICKPRICE'
            | 'APP_READY'
            | 'APP_IN_PROGRESS'
            | 'APP_QUICKPRICING'
            | 'APP_FULLPRICING'
            | 'PRICE_GUARANTEE'
            | 'LOST'
            | 'AGREED'
            | 'DEAL'
            | 'APPROVED'
            | 'DISCARDED'
          )
        | null
      appointment?: components['schemas']['AppointmentResponse']
      customerWishedPrice?: number | null
      bpm?: components['schemas']['BpmResponse']
      swap?: boolean | null
      source:
        | 'E_COMMERCE'
        | 'WALK_IN'
        | 'TICKING'
        | 'IN_CALL'
        | 'PROACTIVITY'
        | 'B2B'
      adUrl?: string | null
      priceOffer?: components['schemas']['PriceOfferModel']
      buyerId?: string | null
      lossReason?:
        | (
            | 'CANCELLED_WITHOUT_REASON'
            | 'NO_INTEREST'
            | 'SEEN_PRICE_DIFFERENCE'
            | 'EXPIRED_PRICE_GUARANTEE'
            | 'NO_SHOW'
            | 'DUPLICITY'
            | 'NOT_RELEVANT'
            | 'FINAL_STAGE'
            | 'CAR_ALREADY_SOLD'
            | 'CALL_BACK'
            | 'SEEN_NO_INTEREST'
            | 'ONLY_INFO'
            | 'NOT_REACHED'
          )
        | null
    }
    PriceOfferModel: {
      fromEur?: number
      toEur?: number
    }
    SimplePageAuctionSearchResponse: {
      content: components['schemas']['AuctionSearchResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    AuctionSearchAggResponse: {
      /** Format: uuid */
      id: string
      /** Format: uuid */
      carId: string
      type: 'REGULAR' | 'REPEATED' | 'SEEN'
      state:
        | 'READY_TO_START'
        | 'IN_PROGRESS'
        | 'SUCCESSFUL'
        | 'FAILED'
        | 'CANCELLED'
        | 'SUCCESSFUL_WINNER_CHANGED'
      /** Format: date-time */
      plannedEndAt?: string | null
      /** Format: date-time */
      createdAt: string
      /** Format: date-time */
      startedAt?: string | null
      validBids: components['schemas']['AuctionPartnerBidResponse'][]
      winningBid?: components['schemas']['AuctionBidSearchResponse']
      previousAuctionWinningBid?: components['schemas']['AuctionBidSearchResponse']
      opportunity?: components['schemas']['OpportunityResponse']
      previousAuctionIdsByCarId: string[]
      previousAuctionIdsByVin: string[]
    }
    SimplePageAuctionSearchAggResponse: {
      content: components['schemas']['AuctionSearchAggResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    AuctionBidsFilter: {
      ids?: string[]
      auctionIds?: string[]
    }
    SimplePageAuctionBidResponse: {
      content: components['schemas']['AuctionBidResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    AdminAuctionResponse: {
      /** Format: uuid */
      id: string
      /** Format: uuid */
      carId: string
      /** Format: uuid */
      opportunityId: string
      type: 'REGULAR' | 'REPEATED' | 'SEEN'
      state:
        | 'READY_TO_START'
        | 'IN_PROGRESS'
        | 'SUCCESSFUL'
        | 'FAILED'
        | 'CANCELLED'
        | 'SUCCESSFUL_WINNER_CHANGED'
      /** Format: date-time */
      startedAt?: string | null
      /** Format: date-time */
      plannedEndAt?: string | null
      /** Format: date-time */
      actualEndAt?: string | null
      winningBid?: components['schemas']['AuctionBidSearchResponse']
      previousAuctionWinningBid?: components['schemas']['AuctionBidSearchResponse']
    }
    ChangeAuctionWinnerRequest: {
      partnerId: string
      winningBidPrice: number
      sellingPrice?: number | null
      sellingPriceCurrencyCode?: ('EUR' | 'CZK' | 'PLN') | null
    }
    SimplePageAdminAuctionResponse: {
      content: components['schemas']['AdminAuctionResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
    RecreateAuctionCommand: {
      /** Format: uuid */
      carId: string
      type: 'REGULAR' | 'REPEATED' | 'SEEN'
      startImmediately: boolean
    }
  }
}

export interface operations {
  createOrUpdateBid: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v2+json': components['schemas']['AuctionBidResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['CreateOrUpdateAuctionBidRequest']
      }
    }
  }
  resolvePreviousAuctionDiff: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['AuctionSnapshotDiffModel'][]
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['PreviousAuctionDiffRequest']
      }
    }
  }
  searchAuctions: {
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
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageAuctionSearchResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['AuctionsFilter']
      }
    }
  }
  searchAuctionsAgg: {
    parameters: {
      query: {
        /** Zero-based page index (0..N) */
        page?: number
        /** The size of the page to be returned */
        size?: number
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[]
        aggregated?: boolean
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageAuctionSearchAggResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['AuctionsFilter']
      }
    }
  }
  searchBids: {
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
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageAuctionBidResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['AuctionBidsFilter']
      }
    }
  }
  startAuction: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['AdminAuctionResponse']
        }
      }
    }
  }
  endAuction: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['AdminAuctionResponse']
        }
      }
    }
  }
  changeWinner: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** No Content */
      204: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['ChangeAuctionWinnerRequest']
      }
    }
  }
  searchAuctions_1: {
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
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageAdminAuctionResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['AuctionsFilter']
      }
    }
  }
  recreateAuction: {
    parameters: {
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['AdminAuctionResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RecreateAuctionCommand']
      }
    }
  }
  getAuction: {
    parameters: {
      path: {
        auctionId: string
      }
      header: {
        'X-Platform'?: unknown
        'User-Agent'?: unknown
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['AdminAuctionResponse']
        }
      }
    }
  }
}

export interface external {}
