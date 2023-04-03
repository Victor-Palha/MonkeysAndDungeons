import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAdventure } from '@/hooks/fetchAdventure';

import styles from './styles.module.scss'
import { GiSpinningSword } from 'react-icons/gi';
import Loading from '@/components/Loading';
import Head from 'next/head';

export default function Adventures() {
    const [type, setType] = useState('false');

    const { data, loading } = useAdventure(type);
    
    useEffect(()=>{
        if(data && data !== ''){
            const field = document.getElementById('field');
            field.innerHTML = data;
        }
    })

    return (
    <>
        <Head><title>Adventures - Monkeys & Dungeons</title></Head>
        <Header main />
            <main className={styles.main}>
                <select onChange={(e) => setType(e.target.value)} value={type} >
                    <option value='false'>Choose Your Adventure Type</option>
                    <option value="Body Horror">Body Horror Adventure</option>
                    <option value="Cosmic Horror">Cosmic Horror Adventure</option>
                    <option value="Dark Fantasy">Dark Fantasy Adventure</option>
                </select>
                
                {loading ? <Loading/> : <div id="field" className={styles.adventure}></div>}
            </main>
        <Footer />
    </>
    );
}