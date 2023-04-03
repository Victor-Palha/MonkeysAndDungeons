import { GiSpinningSword } from 'react-icons/gi';
import styles from './styles.module.scss'

export default function Loading() {
    return(
        <div className={styles.loading}>
            <GiSpinningSword className={styles.loadingIcon} />
        </div>
    )
}
  
