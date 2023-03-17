import Head from "next/head"
import { useRouter } from "next/router"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { useFetch } from "../hooks/useFetch"
import styles from './styles.module.scss'
export default function Monster(){
    const router = useRouter()
    const {nome, source} = router.query
    //API GET
    const {data, loading} = useFetch(`http://localhost:5000/api/monsters/unique?nome=${nome}&source=${source}`, 1)
    console.log(data)
    if(loading){
        return(
            <>
            <Header/>
            <div>
                <h1>Loading...</h1>
            </div>
            <Footer/>
            </>
        )
    }

    return (
        <>  
            <Header/>
                <Head><title>{nome} - Monkeys & Dungeons</title></Head>
                <main className={styles.main}>

                </main>
            <Footer/>
        </>
    )
}