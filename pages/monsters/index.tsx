import Head from "next/head";
import styles from './styles.module.scss'
//Components
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
//Hooks
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";


//interface
import { Monster } from "@/interfaces/Imonster";
import MonsterBox from "../components/MonsterBox";



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
        <Header main={true}/>
        <Head><title>Monsters - Monkeys & Dungeons</title></Head>

            <form className={styles.search}>
                <input type="text" placeholder="Search Monster" onChange={(e)=>setSearch(e.target.value)}/>
            </form>

            <div className={styles.container}>
            {data?.map(monster => {
                    return (
                        <MonsterBox monster={monster}/>
                    )
                })}
                
            </div>
        <Footer/>
        </>
    )
}