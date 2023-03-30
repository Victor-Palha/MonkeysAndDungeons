import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCopyright } from "react-icons/fa";
import { GiAbstract097, GiAnimalHide, GiCharm, GiChewedSkull, GiDeadlyStrike, GiFireSpellCast, GiMagicShield, GiSpellBook } from "react-icons/gi";
import { AiOutlineTrademarkCircle, AiFillFilter} from "react-icons/ai";
import { FcClearFilters } from "react-icons/fc";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './styles.module.scss'

interface Spells{
    name: string;
    source: string;
    level: number;
    ritual: boolean;
    concentration: boolean;
    classes: string[];
    school: string;
}

export default function Spells(){
    const classOptions = [
        {id: "Artificer", label: "Artificer"},
        {id: "Bard", label: "Bard"},
        {id: "Cleric", label: "Cleric"},
        {id: "Druid", label: "Druid"},
        {id: "Paladin", label: "Paladin"},
        {id: "Ranger", label: "Ranger"},
        {id: "Sorcerer", label: "Sorcerer"},
        {id: "Warlock", label: "Warlock"},
        {id: "Wizard", label: "Wizard"},
    ]
    const castingOptions = [
        {id: "1 action", label: "Action"},
        {id: "1 bonus action", label: "Bonus Action"},
        {id: "1 reaction", label: "Reaction"},
    ]
    const concentrationOptions = [
        {id: "true", label: "Concentration"},
        {id: "false", label: "No Concentration"},
    ]
    const ritualOptions = [
        {id: "true", label: "Ritual"},
        {id: "false", label: "No Ritual"},
    ]
    const schoolOptions = [
        {id: "Abjuration", label: "Abjuration"},
        {id: "Conjuration", label: "Conjuration"},
        {id: "Divination", label: "Divination"},
        {id: "Enchantment", label: "Enchantment"},
        {id: "Evocation", label: "Evocation"},
        {id: "Illusion", label: "Illusion"},
        {id: "Necromancy", label: "Necromancy"},
        {id: "Transmutation", label: "Transmutation"},
    ]
    const levelOptions = [
        {id: "0", label: "Cantrip"},
        {id: "1", label: "1st Level"},
        {id: "2", label: "2nd Level"},
        {id: "3", label: "3rd Level"},
        {id: "4", label: "4th Level"},
        {id: "5", label: "5th Level"},
        {id: "6", label: "6th Level"},
        {id: "7", label: "7th Level"},
        {id: "8", label: "8th Level"},
        {id: "9", label: "9th Level"},
    ]

    const [slice, setSlice] = useState(20)
    const [filter, setFilter] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedClass, setSelectedClass] = useState<string | null>("");
    const [selectedCasting, setSelectedCasting] = useState<string | null>("");
    const [selectedConcentration, setSelectedConcentration] = useState<string | null>("");
    const [selectedRitual, setSelectedRitual] = useState<string | null>("");
    const [selectedLevel, setSelectedLevel] = useState<string | null>("");
    const [selectedSchool, setSelectedSchool] = useState<string | null>("");

    const {data, loading} = useFetch<Spells[]>(`http://localhost:5000/api/spells/query?nome=${search}&classe=${selectedClass}&action=${selectedCasting}&concentration=${selectedConcentration}&ritual=${selectedRitual}&level=${selectedLevel}&school=${selectedSchool}`, slice)


    //filter functions
    function handleOptionChangeClass(event: ChangeEvent<HTMLInputElement>) {
      setSelectedClass(event.target.value);
    }
    function handleOptionChangeCasting(event: ChangeEvent<HTMLInputElement>) {
        setSelectedCasting(event.target.value);
      }
      function handleOptionChangeConcentration(event: ChangeEvent<HTMLInputElement>) {
        setSelectedConcentration(event.target.value);
      }
      function handleOptionChangeRitual(event: ChangeEvent<HTMLInputElement>) {
        setSelectedRitual(event.target.value);
      }
      function handleOptionChangeLevel(event: ChangeEvent<HTMLInputElement>) {
        setSelectedLevel(event.target.value);
      }
      function handleOptionChangeSchool(event: ChangeEvent<HTMLInputElement>) {
        setSelectedSchool(event.target.value);
      }

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
        return(
            <>
            <Header/>
                <h1>Loading...</h1>
            <Footer/>
            </>
        )
    }
    return(
        <>
        <Header main/>

        <Head><title></title></Head>
            <form className={styles.search}>
                <input type="text" placeholder="Search Spell" onChange={(e)=>setSearch(e.target.value)}/>
                {filter === false && (
                    <AiFillFilter size={30} onClick={(e)=>setFilter(true)}/>
                )}
                {filter === true && (
                    <FcClearFilters size={30} onClick={(e)=>setFilter(false)}/>
                )}
            </form>
            {filter && (
                <div className={styles.modal}>
                    <div className={styles.filters}>
                        <h3>Classes</h3>
                        {classOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedClass === option.id}
                                onChange={handleOptionChangeClass}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Casting Time</h3>
                        {castingOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedCasting === option.id}
                                onChange={handleOptionChangeCasting}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Concentration</h3>
                        {concentrationOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedConcentration === option.id}
                                onChange={handleOptionChangeConcentration}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Ritual</h3>
                        {ritualOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedRitual === option.id}
                                onChange={handleOptionChangeRitual}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Level</h3>
                        {levelOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedLevel === option.id}
                                onChange={handleOptionChangeLevel}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>School</h3>
                        {schoolOptions.map(option => (
                            <div key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                value={option.id}
                                checked={selectedSchool === option.id}
                                onChange={handleOptionChangeSchool}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.container}>
                {data.map(spell => (
                    <div key={spell.name} className={styles.a}>
                        <div className={styles.box}>
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
                                <p>{spell.level} Cicle</p>
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
                            <p>{spell.ritual}</p>
                            <p>{spell.concentration}</p>
                            <div className={styles.info}>
                                <div className={styles.class}>
                                    {spell.classes.map(classes => (
                                        <span>{classes}, </span>
                                    ))}
                                </div>
                                <p>{spell.source}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        <Footer/>
        </>
    )
}