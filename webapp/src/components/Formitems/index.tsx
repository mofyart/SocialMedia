import css from './index.module.scss'

export const Formitems = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.formItems}>{children}</div>
}
