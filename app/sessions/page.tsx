'use client'
import Filter from '@/components/Filter'
import ListView from '@/components/ListView'
import '@/styles/global.scss'
import { ShortTitle, ShortTitleKey, Status, StatusKey } from '@/types/common'
import { SessionDataObject } from '@/types/response'
import { formatParamsObject, getAPIRequest } from '@/utils/api'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

const testParams = {
  shortTitle: 'math',
}

export const Home: React.FC = () => {
  const [shortTitle, setShortTitle] = useState<ShortTitleKey>()
  const [status, setStatus] = useState<StatusKey>()
  const [sessions, setSessions] = useState<SessionDataObject[]>()
  const router = useRouter()
  const [error, setError] = useState<string>()
  const searchParams = useSearchParams()
  const titleParam = useMemo(
    () => searchParams.get('short_title'),
    [searchParams]
  )
  const statusParam = useMemo(() => searchParams.get('status'), [searchParams])

  useEffect(() => {
    router.push(
      '/sessions' +
        (status || shortTitle ? '?' : '') +
        formatParamsObject({ short_title: shortTitle, status })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, shortTitle])

  useEffect(() => {
    setShortTitle((state) => {
      if (Object.keys(ShortTitle).includes(titleParam || '')) {
        return titleParam as ShortTitleKey
      }

      return state
    })

    setStatus((state) => {
      if (Object.keys(Status).includes(statusParam || '')) {
        return statusParam as StatusKey
      }

      return state
    })

    getAPIRequest('sessions', {
      short_title: titleParam,
      status: statusParam,
    })
      .then((res) => {
        if (res.success && res.data) {
          setSessions(res.data as SessionDataObject[])
        } else {
          setError(res.error)
        }
      })
      .catch(() => console.log('Failed to retrieve sessions data'))
  }, [titleParam, statusParam])

  return (
    <section className="sessions">
      <div className="sessions-filter">
        <Filter
          type="Short Title"
          value={shortTitle}
          setValue={setShortTitle}
        />
        <Filter type="Status" value={status} setValue={setStatus} />
      </div>
      <ListView data={sessions} error={error} />
    </section>
  )
}

export default Home
