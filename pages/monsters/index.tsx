import Head from "next/head";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './styles.module.scss'
import { useState } from "react";
import {GiFishMonster} from 'react-icons/gi'

interface Monster{
    name: string;
    source: string;
    cr:{
        cr?: string;
        lair?: string;
        coven?: string;
    } | string;
    type: Type | string;
    image: boolean;
    ext: string | null;
}
interface Type{
    type: string;
    tags: string[];
    cr?: string;
}

export default function Monsters(){

    const [search, setSearch] = useState('')
    const {data, loading} = useFetch<Monster[]>('http://localhost:5000/api/monsters/query?nome='+search)

    if(loading){
        return (
            <>
                <Header/>
                    <h1 className={styles.loading}>Loading...</h1>
                <Footer/>
            </>
        )
    }
    return (
        <>
        <Header/>
        <Head><title>Monsters - Monkeys & Dungeons</title></Head>

            <form className={styles.search}>
                <input type="text" placeholder="Search Monster" onChange={(e)=>setSearch(e.target.value)}/>
            </form>

            <div className={styles.container}>
            {data?.map(monster => {
                  return (
                    <div className={styles.box} key={monster.name}>
                        {monster.image && (<img src={`http://localhost:5000/bestiary/${monster.source}/${monster.name}${monster.ext}`} alt={monster.name}/>)}
                        {!monster.image && (<GiFishMonster size={100}/>)}
                    <p>{monster.name}</p>
                    <span>Source: {monster.source}</span>
                    <span>Type: {monster.type
                        ? typeof monster.type === 'string'
                            ? monster.type
                            : monster.type.type
                        : ''}
                    </span>
                    <span>CR: {monster.cr
                        ? typeof monster.cr === 'string'
                            ? monster.cr
                            : monster.cr.cr
                        : ''}
                    </span>
                    </div>
                );
                })}
            </div>
        <Footer/>
        </>
    )
}