import Modal from 'react-modal';
import styles from './styles.module.scss'
import {FiX} from 'react-icons/fi';

export interface Spell{
    name: string;
    source: string;
    level: number;
    school: string;
    ritual: boolean;
    casting_time: string;
    range: string;
    components: string;
    duration: Duration;
    description: string;
    higher_level?: string;
    tables?: Tables;
    classes: string[];
}
interface Duration{
    time: string;
    concentration: boolean;
}
interface Tables{
    header: string[];
    rows: string[][];
}
interface ModalSpellsProps {
    isOpen: boolean;
    onRequestClose: () => void;
    spells: Spell;
}

export function ModalSpells({isOpen, onRequestClose, spells}: ModalSpellsProps){
    const customStyles ={
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '2rem',
            transform: "translate(-50%, -50%)",
            backgroundColor: '#fde599',
        }
    }
    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <button type="button" onClick={onRequestClose} className="react-modal-close" style={{background: 'transparent', border:0}}>
                <FiX size={45} color="#f34748"/>
            </button>
            <h2>{spells.name}</h2>
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