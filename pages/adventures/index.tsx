import { Header } from '@/components/Header'
import styles from './styles.module.scss'
import { Footer } from '@/components/Footer'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'

export default function Adventures(){
    const [type, setType] = useState('')
    const [adventure, setAdventure] = useState('')

    async function handleAdventure(){
        const {data} = useFetch<string>(`http://localhost:5000/api/adventure?type=${type}`)
        setAdventure(data)
    }
    const teste = ()=>{
        handleAdventure()
        console.log(adventure)
        //const field = document.getElementById('field')
        //field.innerHTML = adventure
    }
    
    return(
        <>
        <Header main/>
        <main className={styles.main}>
            <select onChange={(e)=>setType(e.target.value)}>
                <option value="Body">Body Horror Adventure</option>
                <option value="Cosmic">Cosmic Horror Adventure</option>
                <option value="Dark Fantasy">Dark Fantasy Adventure</option>
            </select>
            <button onClick={teste}>New Adventure</button>
            <div id="field">

            </div>
        </main>
        <Footer/>
        </>
    )
}