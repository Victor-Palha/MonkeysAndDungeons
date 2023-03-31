import styles from './styles.module.scss';
import Link from 'next/link';

interface IHeader{
    main?: boolean;
}

export function Header(props:IHeader){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><h1>M&D</h1></Link>
            </div>
            <nav className={styles.nav}>
                {props.main && (
                    <>
                        <Link href="/monsters">MONSTERS</Link>
                        <Link href="/spells">SPELLS</Link>
                    </>
                )}
                <Link href="/about">ABOUT</Link>
            </nav>
        </header>
    )
}