import Head from "next/head";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './styles.module.scss'
import { useState, useRef, useEffect } from "react";
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

    const [slice, setSlice] = useState(20)
    const [search, setSearch] = useState('')
    const {data, loading} = useFetch<Monster[]>('http://localhost:5000/api/monsters/query?nome='+search, slice)

    //scroll functions
    function handleScroll(){
        if(window.innerHeight + document.documentElement.scrollTop + 1 > document.body.scrollHeight){
            setSlice(prev => prev + 20)
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)    
    }, [])

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
                    <Link href={{pathname: '/monster', query: { nome: monster.name, source: monster.source }}} key={monster.name} className={styles.a}>
                        <div className={styles.box} >
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
                    </Link>
                );
                })}
                
            </div>
        <Footer/>
        </>
    )
}