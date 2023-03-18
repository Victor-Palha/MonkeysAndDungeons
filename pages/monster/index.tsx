import Head from "next/head"
import { useRouter } from "next/router"
import { GiFishMonster } from "react-icons/gi"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { useFetch } from "../hooks/useFetch"
import styles from './styles.module.scss'

function verifyScore(att:number){
    if(att == 30){
        return "(+10)"
    }
    else if(att >= 28){
        return "(+9)"
    }
    else if(att >= 26){
        return "(+8)"
    }
    else if(att >= 24){
        return "(+7)"
    }
    else if(att >= 22){
        return "(+6)"
    }
    else if(att >= 20){
        return "(+5)"
    }
    else if(att >= 18){
        return "(+4)"
    }else if(att >= 16){
        return "(+3)"
    }else if(att >= 14){
        return "(+2)"
    }else if(att >= 12){
        return "(+1)"
    }else if(att >= 10){
        return "(+0)"
    }else if(att >= 8){
        return "(-1)"
    }else if(att >= 6){
        return "(-2)"
    }else if(att >= 4){
        return "(-3)"
    }else if(att >= 2){
        return "(-4)"
    }else{
        return "(-5)"
    }
}
function verifySource(source: string){
    if(source === "MM"){
        return "Monster Manual"
    }else if(source === "MPMM"){
        return "Mordenkainen Presents: Monsters of Multiverse"
    }else if(source === "VRGR"){
        return "Van Richten's Guide to Ravenloft"
    }
}
export default function Monster(){
    const router = useRouter()
    const {nome, source, ext, img} = router.query
    //API GET
    const {data, loading} = useFetch<any>(`http://localhost:5000/api/monsters/unique?nome=${nome}&source=${source}`, 1)
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
                    {data?.map((info)=>{
                        return(
                                <div className={styles.information} key={info.name}>
                                    <div className={styles.image}>
                                        {img === "true" && <img src={`http://localhost:5000/bestiary/${info.source}/${info.name}${ext}`} alt={info.name}/>}
                                        {img === "false" && <GiFishMonster size={100} className={styles.svg}/> }
                                    </div>
                                    <div className={styles.mainInfo}>
                                        <div className={styles.baseInfo}>
                                            <h1>{info.name}</h1>
                                            <p><strong>Source: </strong>{verifySource(info.source)}</p>
                                            <p><strong>Type:</strong>  {info.type
                                                ? typeof info.type === 'string'
                                                    ? info.type
                                                    : info.type.type
                                                : ''}
                                            </p>
                                            {info.ac && (
                                                <p><strong>Armor Class:</strong>  {info.ac[0].ac ? info.ac[0].ac : info.ac[0]}</p>
                                            )}
                                            {info.hp&& (
                                                <p><strong>Life points:</strong>  {info.hp.average} ({info.hp.formula})</p>
                                            )}
                                            <p>
                                            <strong>Speed:</strong> {info.speed && Object.keys(info.speed).map(element => {
                                                let speedText;
                                                if (typeof info.speed[element] === "number") {
                                                speedText = `${info.speed[element]} ft.`;
                                                } else {
                                                const { number, condition } = info.speed[element];
                                                    speedText = `${number} ft. ${condition}`;
                                                }
                                                return (
                                                <span key={element}>
                                                    {element}: {speedText},
                                                </span>
                                                );
                                            })}
                                            </p>
                                        </div>
                                        <div className={styles.status}>
                                            <p><strong>STR:</strong> {info.str} {verifyScore(info.str)}</p>
                                            <p><strong>DEX: </strong> {info.dex} {verifyScore(info.dex)}</p>
                                            <p><strong>CON: </strong> {info.con} {verifyScore(info.con)}</p>
                                            <p><strong>INT: </strong> {info.int} {verifyScore(info.int)}</p>
                                            <p><strong>WIS: </strong> {info.wis} {verifyScore(info.wis)}</p>
                                            <p><strong>CHA: </strong> {info.cha} {verifyScore(info.cha)}</p>
                                        </div>
                                        <div className={styles.saves}>
                                            <p><strong>Skills: </strong>
                                            {info.skill && Object.keys(info.skill).map(element => (
                                                <span key={element}>
                                                    {element}: {info.skill[element]}, 
                                                </span>
                                            ))}
                                            </p>
                                            <p><strong>Senses: </strong>{info.senses && info.senses.map(sense=>sense)}, passive perception: {info.passive}</p>
                                            <p><strong>Languages: </strong>{info.languages && info.languages.map(language=> (<span key={language}>{language},</span>))}</p>
                                            <p><strong>Challenge: </strong>{info.cr
                                                ? typeof info.cr === 'string'
                                                    ? info.cr
                                                    : info.cr.cr
                                                : ''}</p>
                                        </div>
                                        {info.trait && (
                                            <div className={styles.trait}>
                                                <h2>Traits</h2>
                                                {info.trait.map(trait=>(
                                                    <div key={trait.name}>
                                                        <h3>{trait.name}</h3>
                                                        <p>{trait.entries[0]}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.actions}>
                                        {info.action && (
                                            <div className={styles.action}>
                                                <h2>Actions</h2>
                                                {info.action.map(action=>(
                                                    <div key={action.name}>
                                                        <h3>{action.name}</h3>
                                                        <p>{action.entries[0]}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            
                        )
                        
                    })}
                </main>
            <Footer/>
        </>
    )
}