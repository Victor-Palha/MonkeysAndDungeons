import styles from './styles.module.scss';
import Link from 'next/link';
export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><h1>M&D</h1></Link>
            </div>
            <nav className={styles.nav}>
                <Link href="/monsters">MONSTERS</Link>
                <Link href="/about">ABOUT</Link>
            </nav>
        </header>
    )
}