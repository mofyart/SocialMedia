import React from 'react'
import css from './index.module.scss'

export const Segment = ({
  title,
  size = 1,
  descryption,
  children,
}: {
  title: React.ReactNode
  size?: 1 | 2
  descryption?: string
  children?: React.ReactNode
}) => {
  return (
    <div className={css.segment}>
      {size === 1 ? <h1 className={css.title}>{title}</h1> : <h2 className={css.title}>{title}</h2>}
      {descryption && <p className={css.description}>{descryption}</p>}
      {children && <div className={css.content}>{children}</div>}
    </div>
  )
}
