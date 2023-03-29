import Head from "next/head";
import { useState } from "react";
import { FaCopyright } from "react-icons/fa";
import { GiAbstract097, GiAnimalHide, GiCharm, GiChewedSkull, GiDeadlyStrike, GiFireSpellCast, GiMagicShield, GiSpellBook } from "react-icons/gi";
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './styles.module.scss'

interface Spells{
    name: string;
    source: string;
    level: number;
    ritual: boolean;
    concentration: boolean;
    classes: string[];
    school: string;
}

export default function Spells(){
    const [search, setSearch] = useState('')
    const {data, loading} = useFetch<Spells[]>(`http://localhost:5000/api/spells/query?nome=${search}`, 100)
    if(loading){
        return(
            <>
            <Header/>
                <h1>Loading...</h1>
            <Footer/>
            </>
        )
    }
    return(
        <>
        <Header main/>
        <Head><title></title></Head>

            <form className={styles.search}>
                <input type="text" placeholder="Search Spell" onChange={(e)=>setSearch(e.target.value)}/>
            </form>
            <div className={styles.container}>
                {data.map(spell => (
                    <div key={spell.name} className={styles.a}>
                        <div className={styles.box}>
                            {spell.school === 'Evocation' && (
                                <GiFireSpellCast size={100}/>
                            )}
                            {spell.school === 'Divination' && (
                                <GiSpellBook size={100}/>
                            )}
                            {spell.school === 'Necromancy' && (
                                <GiChewedSkull size={100}/>
                            )}
                            {spell.school === 'Abjuration' && (
                                <GiMagicShield size={100}/>
                            )}
                            {spell.school === 'Transmutation' && (
                                <GiAnimalHide size={100}/>
                            )}
                            {spell.school === 'Conjuration' && (
                                <GiDeadlyStrike size={100}/>
                            )}
                            {spell.school === 'Enchantment' && (
                                <GiCharm size={100}/>
                            )}
                            {spell.school === 'Illusion' && (
                                <GiAbstract097 size={100}/>
                            )}
                            <h2>{spell.name}</h2>
                            
                            {spell.level === 0 && (
                                <p>Cantrip</p>
                            )}
                            {spell.level !== 0 && (
                                <p>{spell.level} Cicle</p>
                            )}
                            <p>{spell.school} Spell</p>
                            <div className={styles.booleans}>
                                {spell.concentration === true && (
                                    <FaCopyright/>
                                )}
                                {spell.ritual === true && (
                                    <AiOutlineTrademarkCircle />
                                )}
                            </div>
                            <p>{spell.ritual}</p>
                            <p>{spell.concentration}</p>
                            <div className={styles.info}>
                                <div className={styles.class}>
                                    {spell.classes.map(classes => (
                                        <span>{classes}, </span>
                                    ))}
                                </div>
                                <p>{spell.source}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        <Footer/>
        </>
    )
}