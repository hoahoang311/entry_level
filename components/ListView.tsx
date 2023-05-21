/* eslint-disable @next/next/no-img-element */
'use client'

import { SessionDataObject } from '@/types/response'
import styles from '@/styles/listView.module.scss'
import { formatDateData } from '@/utils/session'

interface Props {
  data: SessionDataObject[] | undefined
  error: string | undefined
}

const ListView: React.FC<Props> = ({ data, error }) => {
  const renderItem = (session: SessionDataObject) => {
    const { end_date, id, name, program, start_date } = session

    return (
      <div key={id}>
        <small className={styles['list-item-name']}>{name}</small>
        <div className={styles['list-item']}>
          <img
            src={program[0].thumbnail_img_url}
            alt={name}
            className={styles['list-item-img']}
          />
          <span className={styles['list-item-course-name']}>
            {program[0].display_title}
          </span>
          <span className={styles['list-item-date']}>
            {formatDateData(start_date)} - {formatDateData(end_date)}
          </span>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (!data) {
      return <span>{error ? error : 'loadding...'}</span>
    }

    if (!data.length) {
      return <span>{error ? error : 'No data match the criteria'}</span>
    }

    return (
      <div className={styles['list-container']}>{data.map(renderItem)}</div>
    )
  }

  return <div className={styles['list-view']}>{renderContent()}</div>
}

export default ListView
