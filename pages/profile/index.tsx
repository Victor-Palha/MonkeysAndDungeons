import { useEffect, useState } from "react";
//components
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
//Interfaces
import { ISpellsToBox } from "@/interfaces/Ispells";
import SpellsBox from "@/components/SpellsBox";
import SpellsTable from "@/components/SpellsTable";

export default function Profile(){

    const [grimoire, setGrimoire] = useState<ISpellsToBox[]>([])

    useEffect(()=>{
        const myGrimoire = localStorage.getItem("@grimoire")
        setGrimoire(JSON.parse(myGrimoire) || [])
    },[])
    
    return(
        <>
            <Header main/>
            <main>
                <div className={styles.saves}>
                    <h2>My Grimoire</h2>
                    <div className={styles.container}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>School</th>
                                    <th>Con.</th>
                                    <th>Level</th>
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grimoire.map((spell, index)=>(
                                    <SpellsTable spell={spell} key={index}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.saves}>
                    <h2>My Bestiary</h2>
                </div>
            </main>
            <Footer/>
        </>
    )
}