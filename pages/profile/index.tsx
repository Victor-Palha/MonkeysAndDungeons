import { useEffect, useState } from "react";
//components
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
//Interfaces
import { ISpellsToBox } from "@/interfaces/Ispells";
import SpellsBox from "@/components/SpellsBox";

export default function Profile(){

    const [grimoire, setGrimoire] = useState<ISpellsToBox[]>([])

    useEffect(()=>{
        const myGrimoire = localStorage.getItem("@grimoire")
        alert(myGrimoire)
        setGrimoire(JSON.parse(myGrimoire) || [])
    },[])
    
    return(
        <>
            <Header main/>
            <main>
                <h1>Profile</h1>
                <div className={styles.saves}>
                    <h2>Grimoire</h2>
                    <div className={styles.container}>
                        {grimoire.length > 0 && grimoire.map((spell: ISpellsToBox) => (
                            <SpellsBox spell={spell} key={spell.name} />
                        ))}
                    </div>
                </div>
                <div className={styles.saves}>
                    <h2>Bestiary</h2>
                </div>
            </main>
            <Footer/>
        </>
    )
}