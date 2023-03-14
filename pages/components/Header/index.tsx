import styles from './styles.module.scss';
import Link from 'next/link';
export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>M&D</h1>
            </div>
            <nav className={styles.nav}>
                <Link href='/'>Home</Link>
            </nav>
        </header>
    )
}