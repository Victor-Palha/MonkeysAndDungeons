import { ISpellItem, ISpellsToBox } from "@/interfaces/Ispells";
//modal
import { ModalSpells } from "../ModalSpells"
import Modal from "react-modal";
import { useState } from "react";

export default function SpellsTable( { spell }: { spell: ISpellsToBox }){
        //Modal States and Functions
        const [modalVisible, setModalVisible] = useState(false)
        const [modalItem, setModalItem] = useState<ISpellItem>()
        function handleCloseModal(){
            setModalVisible(false)
        }
    
        async function handleModal(name:string){
            const response = await fetch(`http://localhost:5000/api/spells/unique?nome=${name}`)
            const data = await response.json()
            setModalItem(data[0])
            setModalVisible(true)
        }
        //Start Modal
        Modal.setAppElement("#__next")
    return (
        <>
        <tr onClick={()=>handleModal(spell.name)}>
            <td>{spell.name}</td>
            <td>{spell.school} {spell.ritual && (" (Ritual)")}</td>
            <td>{spell.concentration && ("C")} {!spell.concentration && ("")}</td>
            <td>{spell.level}</td>
            <td>{spell.source}</td>
            
        </tr>
        {modalVisible && (
                <ModalSpells isOpen={modalVisible} onRequestClose={handleCloseModal} spells={modalItem}/>
        )}
        </>
        
    )
}