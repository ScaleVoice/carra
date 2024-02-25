/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/admin/files/temporary/upload': {
    post: operations['upload']
  }
  '/admin/files/search': {
    post: operations['fileSearch']
  }
}

export interface components {
  schemas: {
    TemporaryFileResponse: {
      /** Format: uuid */
      id: string
    }
    FileSearchFilter: {
      ids: string[]
    }
    AdminFileResponse: {
      /** Format: uuid */
      id: string
      url: string
      publicUrl?: string
    }
    SimplePageAdminFileResponse: {
      content: components['schemas']['AdminFileResponse'][]
      /** Format: int64 */
      totalElements: number
      /** Format: int32 */
      totalPages: number
    }
  }
}

export interface operations {
  upload: {
    parameters: {
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
          'application/com.driverama-v1+json': components['schemas']['TemporaryFileResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': {
          /** Format: binary */
          file: string
        }
      }
    }
  }
  fileSearch: {
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
          'application/com.driverama-v1+json': components['schemas']['SimplePageAdminFileResponse']
        }
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['FileSearchFilter']
      }
    }
  }
}

export interface external {}