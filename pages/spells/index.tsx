import Head from "next/head";
import styles from './styles.module.scss'
//Icons
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillFilter} from "react-icons/ai";
import { FcClearFilters } from "react-icons/fc";
//Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useFetch } from "../../hooks/useFetch";
//Spell Box
import SpellsBox from "../../components/SpellsBox";
//Interfaces
import { Filters, ISpellsToBox } from "@/interfaces/Ispells";




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
    const sourceOptions = [
        {id: "PHB", label: "Player's Handbook"},
        {id: "AAG", label: "Astral Adventures Guide"},
        {id: "AI", label: "Acquisitions Inc."},
        {id: "FTD", label: "Fizban's Treasury of Dragons"},
        {id: "SCC", label: "Strixhaven: A Curriculum of Chaos"},
        {id: "TCE", label: "Tasha's Cauldron of Everything"},
    ]


    const [filters, setFilters] = useState<Filters>({ nome: "" });
    const [slice, setSlice] = useState(20)
    const [filter, setFilter] = useState(false)
    const [Url, setUrl] = useState(`http://localhost:5000/api/spells/query`)

    //filter functions
    function handleOptionChangeName(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, nome: event.target.value });
      }
      
      function handleOptionChangeClass(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, classe: event.target.value });
      }
      
      function handleOptionChangeCasting(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, action: event.target.value });
      }
      
      function handleOptionChangeConcentration(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, concentration: event.target.value === "true" });
      }
      
      function handleOptionChangeRitual(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, ritual: event.target.value === "true" });
      }
      
      function handleOptionChangeLevel(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, level: parseInt(event.target.value) });
      }
      
      function handleOptionChangeSchool(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, school: event.target.value });
      }
      function handleOptionChangeSource(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, source: event.target.value });
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

    //Filters
    useEffect(() => {
        const url = new URL("http://localhost:5000/api/spells/query");
        const params = new URLSearchParams(filters as any);
      
        url.search = params.toString();
      
        setUrl(url.toString());
      }, [filters]);
      
    function handleFilters(){
        setFilters({nome: ""})
        setFilter(false)
    }

    //Fetch Datas
    const {data, loading} = useFetch<ISpellsToBox[]>(Url, slice)


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

        <Head><title>Spells - Monkeys & Dungeons</title></Head>
            <form className={styles.search}>
                <input type="text" placeholder="Search Spell" onChange={handleOptionChangeName}/>
                {filter === false && (
                    <AiFillFilter size={30} onClick={(e)=>setFilter(true)}/>
                )}
                {filter === true && (
                    <FcClearFilters size={30} onClick={handleFilters}/>
                )}
            </form>
            {filter && (
                <div className={styles.modal}>
                    <div className={styles.filters}>
                        <h3>Classes</h3>
                        {classOptions.map(option => (
                            <div key={option.id}>
                                <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeClass} name="class"/>
                                <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Casting Time</h3>
                        {castingOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeCasting} name="action"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Concentration</h3>
                        {concentrationOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeConcentration} name="concentration"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Ritual</h3>
                        {ritualOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeRitual} name="ritual"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Level</h3>
                        {levelOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeLevel} name="level"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>School</h3>
                        {schoolOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeSchool} name="school"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.filters}>
                        <h3>Source</h3>
                        {sourceOptions.map(option => (
                            <div key={option.id}>
                            <input type="radio" id={option.id} value={option.id} onChange={handleOptionChangeSource} name="source"/>
                            <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.container}>
                {data.map(spell => (
                    <SpellsBox spell={spell} key={spell.name}/>
                ))}
            </div>
            
        <Footer/>
        </>
    )
}