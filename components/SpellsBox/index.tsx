import { useState } from "react"
import styles from "./styles.module.scss"
import { ModalSpells } from "../ModalSpells"
import Modal from "react-modal";
//interfaces
import { ISpellItem, ISpellsToBox} from "@/interfaces/Ispells";
//Icons
import { FaCopyright } from "react-icons/fa";
import { GiAbstract097, GiAnimalHide, GiCharm, GiChewedSkull, GiDeadlyStrike, GiFireSpellCast, GiMagicShield, GiSpellBook } from "react-icons/gi";
import { AiOutlineTrademarkCircle} from "react-icons/ai";

export default function SpellsBox( { spell }: { spell: ISpellsToBox }){

    //Modal States and Functions
    const [modalVisible, setModalVisible] = useState(false)
    const [modalItem, setModalItem] = useState<ISpellItem>()
    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleModal(id:string){
        const response = await fetch(`http://localhost:5000/api/spells/${id}`)
        const data = await response.json()
        setModalItem(data[0])
        setModalVisible(true)
    }
    //Start Modal
    Modal.setAppElement("#__next")
    return (
        <>
            <div key={spell.id} className={styles.a}>
                <div className={styles.box} onClick={()=>handleModal(spell.id)}>
                    {spell.school === 'Evocation' && (
                        <GiFireSpellCast size={100}/>
                    )}
                    {spell.school === 'Divination' && (
                        <GiSpellBook size={100}/>
                    )}
                    {spell.school === 'Necromancy' && (
                        <GiChewedSkull size={100}/>
                    )}
                    {spell.school === 'Abjuration' && (
                        <GiMagicShield size={100}/>
                    )}
                    {spell.school === 'Transmutation' && (
                        <GiAnimalHide size={100}/>
                    )}
                    {spell.school === 'Conjuration' && (
                        <GiDeadlyStrike size={100}/>
                    )}
                    {spell.school === 'Enchantment' && (
                        <GiCharm size={100}/>
                    )}
                    {spell.school === 'Illusion' && (
                        <GiAbstract097 size={100}/>
                    )}
                    <h2>{spell.name}</h2>
                    
                    {spell.level === 0 && (
                        <p>Cantrip</p>
                    )}
                    {spell.level !== 0 && (
                        <p>{spell.level} Level</p>
                    )}
                    <p>{spell.school} Spell</p>
                    <div className={styles.booleans}>
                        {spell.concentration === true && (
                            <FaCopyright/>
                        )}
                        {spell.ritual === true && (
                            <AiOutlineTrademarkCircle />
                        )}
                    </div>
                    <div className={styles.info}>
                        <p>{spell.classes.join(', ')}</p>
                        <p>{spell.source}</p>
                    </div>
                </div>
            </div>
            {modalVisible && (
                <ModalSpells isOpen={modalVisible} onRequestClose={handleCloseModal} spells={modalItem} baseSpell={spell}/>
            )}
        </>
    )
}