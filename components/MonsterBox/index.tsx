import Link from "next/link";
import styles from './styles.module.scss'
//Icons
import {GiFishMonster} from 'react-icons/gi'

//Interface
import { Monster } from "@/interfaces/Imonster";

export default function MonsterBox({monster}: {monster:Monster}){
    return(
        <Link href={{pathname: '/monster', query: { nome: monster.name, source: monster.source, ext:monster.ext, img: monster.image }}} key={monster.name} className={styles.a}>
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
            <span>Challenge: {monster.cr
                ? typeof monster.cr === 'string'
                    ? monster.cr
                    : monster.cr.cr
                : ''}
            </span>
            </div>
        </Link>
    )
}