import { GenericAPIRequestResponse, SessionDataObject } from '@/types/response'
import { NextRequest } from 'next/server'

type RequestType = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestInfo {
  method: RequestType
  headers: {
    Accept: string
    'Content-Type'?: string
    Authorization?: string
  }
  body?: string
  signal?: AbortSignal
}

type APIDataType = 'sessions'

/**
 * Send GET request to server
 *
 * @param dataType
 * @param params
 * @returns
 */
export const getAPIRequest = async (
  dataType: APIDataType,
  params?: Record<string, unknown>
): Promise<GenericAPIRequestResponse> => {
  let reqOptions: RequestInfo = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }

  const endPoint = `/api/${dataType}/${
    params ? '?' + formatParamsObject(params) : ''
  }`

  return (await fetch(endPoint, reqOptions)).json()
}

/**
 * Format GET params object to string
 *
 * @param params
 * @returns string| undefined
 */
export const formatParamsObject = (
  params: Record<string, unknown>
): string | undefined => {
  return Object.entries(filterParamObject(params))
    .map(([key, value]: [string, unknown], index: number) => {
      if (typeof value === 'object' || Array.isArray(value)) {
        console.log('Wrong type for params value')
      }

      if (!value) {
        return ''
      }

      return `${index > 0 ? '&' : ''}${key}=${value}`
    })
    .join('')
}

/**
 * Filter Param object (to remove undefined values)
 *
 * @param params
 * @returns Record<string, unknown>
 */
export const filterParamObject = (
  params: Record<string, unknown>
): Record<string, unknown> => {
  return Object.entries(params).reduce(
    (filtered: Record<string, unknown>, [field, value]) => {
      if (value) {
        filtered[field] = value
      }

      return filtered
    },
    {}
  )
}

/**
 * Get value of search param from NextRequest
 *
 * @param request
 * @param field
 * @returns string | null
 */
export const getSearchParamFromRequest = (
  request: NextRequest,
  field: string
): string | null => {
  return request.nextUrl.searchParams.get(field)
}

/**
 * Sort Sessions data by start_date
 *
 * @param array
 * @returns SessionDataObject[] | undefined
 */
export const sortSessionByDate = (
  array: SessionDataObject[] | undefined
): SessionDataObject[] | undefined => {
  if (!array) {
    return
  }

  if (!array.length) {
    return []
  }

  return array.sort((a, b) => {
    if (new Date(a.start_date) > new Date(b.start_date)) {
      return -1
    } else if (new Date(a.start_date) < new Date(b.start_date)) {
      return 1
    }

    return 0
  })
}
