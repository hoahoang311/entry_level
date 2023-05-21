import { SessionDataObject } from '@/types/response'
import { getSearchParamFromRequest, sortSessionByDate } from '@/utils/api'
import { Envs } from '@/utils/config'
import { NextRequest } from 'next/server'

let sessions: SessionDataObject[] | undefined = undefined

export const GET = async (request: NextRequest) => {
  const shortTitle = getSearchParamFromRequest(request, 'short_title')
  const status = getSearchParamFromRequest(request, 'status')

  try {
    const res = (await fetch(Envs.TEST_DATA_ENDPOINT || '')) as Response
    sessions = (await res.json()) || []

    if (status) {
      sessions = sessions?.filter(
        (session) => session.status === status.toUpperCase()
      )
    }

    if (shortTitle) {
      sessions = sessions?.filter(
        (session) => session.program[0].short_title === shortTitle
      )
    }

    if (sessions && sessions.length > 50) {
      sessions = sessions.slice(0, 50)
    }

    return new Response(
      JSON.stringify({ data: sortSessionByDate(sessions), success: true }),
      {
        status: 200,
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data', success: false }),
      { status: 500 }
    )
  }
}
