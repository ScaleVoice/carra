/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/service-accounts/tokens/refresh': {
    post: operations['refresh']
  }
  '/service-accounts/login': {
    post: operations['login']
  }
  '/employees/tokens/refresh': {
    post: operations['refreshToken']
  }
  '/employees/search': {
    post: operations['search']
  }
  '/employees/login': {
    post: operations['loginEmployee']
  }
  '/employees/self': {
    get: operations['getSelf']
  }
}

export interface components {
  schemas: {
    ServiceAccountAccessRequest: {
      clientId?: string
      clientSecret?: string
    }
    TokensResponse: {
      accessToken?: string
      /** Format: int64 */
      expiresInS?: number
      refreshToken?: string
      /** Format: int64 */
      refreshExpiresInS?: number
      idToken?: string
    }
    SearchEmployeesFilter: {
      ids?: string[]
      fullText?: string
    }
    EmployeeSearchResponse: {
      id: string
      firstName: string
      surname: string
    }
    SimplePageEmployeeSearchResponse: {
      content?: components['schemas']['EmployeeSearchResponse'][]
      /** Format: int64 */
      totalElements?: number
      /** Format: int32 */
      totalPages?: number
    }
    LoginEmployeeCommand: {
      authorizationCode: string
      redirectUri: string
    }
    EmployeeSelfResponse: {
      id?: string
      email?: string
      firstName?: string
      surname?: string
    }
  }
}

export interface operations {
  refresh: {
    parameters: {
      query: {
        refreshToken: string
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
          'application/com.driverama-v1+json': components['schemas']['TokensResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['ServiceAccountAccessRequest']
      }
    }
  }
  login: {
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
          'application/com.driverama-v1+json': components['schemas']['TokensResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['ServiceAccountAccessRequest']
      }
    }
  }
  refreshToken: {
    parameters: {
      query: {
        refreshToken: string
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
          'application/com.driverama-v2+json': components['schemas']['TokensResponse']
        }
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
        'Accept-Language'?: unknown
        'X-Install-UUID'?: unknown
        Accept: unknown
      }
    }
    responses: {
      /** OK */
      200: {
        content: {
          'application/com.driverama-v1+json': components['schemas']['SimplePageEmployeeSearchResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['SearchEmployeesFilter']
      }
    }
  }
  loginEmployee: {
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
          'application/com.driverama-v2+json': components['schemas']['TokensResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginEmployeeCommand']
      }
    }
  }
  getSelf: {
    parameters: {
      query: {
        employeeId: string
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
          'application/com.driverama-v1+json': components['schemas']['EmployeeSelfResponse']
        }
      }
    }
  }
}

export interface external {}
