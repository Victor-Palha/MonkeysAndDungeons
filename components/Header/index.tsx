import styles from './styles.module.scss';
import Link from 'next/link';
import { useState } from 'react';
//icons
import {CgMenu, CgMenuMotion} from 'react-icons/cg';

interface IHeader{
    main?: boolean;
}

export function Header(props:IHeader){
    const [mobile, setMobile] = useState(false);
    function verifyMobile(){
        if(mobile){
            setMobile(false);
        }else if(!mobile){
            setMobile(true);
        }
    }
    return(
        <>
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
            <nav className={styles.navMobile}>
                {!mobile && (
                    <CgMenu size={25} onClick={verifyMobile}/>
                )}
                {mobile && (
                    <CgMenuMotion size={25} onClick={verifyMobile}/>
                )}
            </nav>
        </header>
        {mobile && (
            <div className={styles.mobile}>
                {props.main && (
                    <>
                        <Link href="/monsters">MONSTERS</Link>
                        <Link href="/spells">SPELLS</Link>
                    </>
                )}
                <Link href="/about">ABOUT</Link>
        </div>
        )}
        </>
    )
}