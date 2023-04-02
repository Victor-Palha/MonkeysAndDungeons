import Modal from 'react-modal';
import styles from './styles.module.scss'
import {toast} from 'react-toastify'
//Icons
import {FiX} from 'react-icons/fi';
import {BsBookmarkDashFill} from 'react-icons/bs';
//Interface
import { ISpellItem, ISpellsToBox } from '@/interfaces/Ispells';
import { FcBookmark } from 'react-icons/fc';
import { useEffect, useState } from 'react';

interface ModalSpellsProps {
    isOpen: boolean;
    onRequestClose: () => void;
    spells: ISpellItem;
    baseSpell?: ISpellsToBox;
}

export function ModalSpells({isOpen, onRequestClose, spells, baseSpell}: ModalSpellsProps){
    
    const [saved, setSeved] = useState(false)
    const [grimoire, setGrimoire] = useState<ISpellsToBox[]>([])

    useEffect(()=>{
        const savedSpells = localStorage.getItem("@grimoire")
        const myGrimoire:ISpellsToBox[] = JSON.parse(savedSpells) || []
        const thisSpell = myGrimoire.some((spell: ISpellsToBox) => spell.name === spells.name)

        if(thisSpell){
            setSeved(true)
        }else{
            setSeved(false)
        }
        setGrimoire(myGrimoire)

    },[])

    
    
    function handleSaveSpell(){
        const thisSpell = grimoire.some((spell: ISpellsToBox) => spell.name === spells.name)

        if(thisSpell){
            toast.warn("This spell is already in your grimoire")
            return
        }else{
            alert(baseSpell)
            setGrimoire([...grimoire, baseSpell])
            alert(grimoire)
            localStorage.setItem("@grimoire", JSON.stringify(grimoire))
            toast.success("Spell added to your grimoire")
        }
    }

    function handleDeleteSpell(){
        const thisSpell = grimoire.some((spell: ISpellsToBox) => spell.name === spells.name)
        if(thisSpell){
            const newGrimoire = grimoire.filter((spell: ISpellsToBox) => spell.name !== spells.name)
            localStorage.setItem("@grimoire", JSON.stringify(newGrimoire))
            toast.success("Spell deleted from your grimoire")
        }else{
            toast.warn("This spell is not in your grimoire")
            return
        }
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalSpell}>
            <button type="button" onClick={onRequestClose} className="react-modal-close" style={{background: 'transparent', border:0}}>
                <FiX size={45} color="#f34748"/>
            </button>
            <div className={styles.save}>
                <h2>{spells.name}</h2>
                {!saved && (
                    <>
                        <FcBookmark onClick={handleSaveSpell}/>
                        <span>Save Spell</span>
                    </>
                )}
                {saved && (
                    <>
                        <BsBookmarkDashFill onClick={handleDeleteSpell} color='crimson'/>
                        <span>Delete Spell</span>
                    </>
                )}
            </div>
            <span>{spells.level === 0 && (<strong>Cantrip {spells.school}</strong>)}{spells.level > 0 && (<strong>{spells.level}° level {spells.school}</strong>)}{spells.ritual === true && (" (Ritual)")}</span>
            <div className={styles.info}>
                <p><strong>Casting Time: </strong>{spells.casting_time}</p>
                <p><strong>Range: </strong>{spells.range}</p>
                <p><strong>Components: </strong>{spells.components}</p>
                <p><strong>Duration: </strong>{spells.duration.concentration === true && ("Concentration, ")}{spells.duration.time}</p>
            </div>
            <p>{spells.description}</p>
            <br />
            {spells.tables && (
                <table className={styles.tables}>
                    <thead>
                        <tr>
                        {spells.tables.header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody> 
                        {spells.tables.rows.map((row, index) => (
                            <tr key={index}>
                            {row.map((item, index) => (
                                <td key={index}>{item}</td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {spells.higher_level && <p><strong>At Higher Levels. </strong>{spells.higher_level}</p>}
            <p><strong>Classes: </strong>{spells.classes.join(', ')}</p>
        </Modal>
    )
}