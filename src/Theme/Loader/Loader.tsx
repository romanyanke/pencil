import { useTranslation } from 'react-i18next'
import classes from './Loader.module.css'
import Globe from '../../Globe'

const Loader = ({ isError }: { isError: boolean }) => {
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      {isError ? (
        <p>{t('error')} 🙈</p>
      ) : (
        <p>
          <Globe animated /> {t('loading')}
        </p>
      )}
    </div>
  )
}

export default Loader
