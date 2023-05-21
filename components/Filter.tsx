'use client'
import { ShortTitle, ShortTitleKey, Status, StatusKey } from '@/types/common'
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type FilterType = 'Short Title' | 'Status'

interface Props {
  type: FilterType
  value: ShortTitleKey | StatusKey | undefined
  setValue:
    | Dispatch<SetStateAction<ShortTitleKey | undefined>>
    | Dispatch<SetStateAction<StatusKey | undefined>>
}

const Filter: React.FC<Props> = ({ type, value, setValue }) => {
  const [open, setOpen] = useState<boolean>(false)
  const options = useMemo(() => {
    switch (type) {
      case 'Short Title':
        return Object.keys(ShortTitle)
      case 'Status':
        return Object.keys(Status)
      default:
        return
    }
  }, [type])

  useEffect(() => {
    const mainElem = document.getElementById('main')

    const handleClick = (e: Event) => {
      if (
        e.target instanceof HTMLElement &&
        !(
          e.target.className.includes('filter-button') ||
          e.target.className.includes('filter-item') ||
          e.target.className.includes('filter-list')
        )
      ) {
        setOpen(false)
      }
    }

    mainElem?.addEventListener('click', handleClick)

    return () => mainElem?.removeEventListener('click', handleClick)
  }, [])

  const handleToggleList = () => setOpen((state) => !state)

  const handleRemoveSelect = () => value && setValue(undefined)

  const renderItem = (option: any) => {
    const handleSelect = (e: MouseEvent) => {
      e.preventDefault()
      setValue(option)
      setOpen(false)
    }

    return (
      <li className="filter-item" onClick={handleSelect} key={option}>
        {option}
      </li>
    )
  }

  return (
    <div
      className={'filter ' + 'filter_' + type.toLowerCase().replace(' ', '_')}
    >
      <small>{type}</small>
      <div className="button-container">
        <button
          type="button"
          placeholder=""
          className="filter-button"
          onClick={handleToggleList}
        >
          {value || 'select ' + type.toLowerCase()}
        </button>
        <div className="filter-remove" onClick={handleRemoveSelect}>
          <small>x</small>
        </div>
      </div>
      {open && options && (
        <ul className="filter-list">{options.map(renderItem)}</ul>
      )}
    </div>
  )
}

export default Filter
