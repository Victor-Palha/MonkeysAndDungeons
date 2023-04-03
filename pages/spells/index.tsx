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
import SpellsTable from "@/components/SpellsTable";




export default function Spells(){
    const classOptions = [
        {id: "", label: "All Classes"},
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
        {id: "", label: "All Casting Times"},
        {id: "1 action", label: "Action"},
        {id: "1 bonus action", label: "Bonus Action"},
        {id: "1 reaction", label: "Reaction"},
    ]
    const concentrationOptions = [
        {id: "", label: "Concentration or No Concentration"},
        {id: "true", label: "Concentration"},
        {id: "false", label: "No Concentration"},
    ]
    const ritualOptions = [
        {id: "", label: "Ritual or No Ritual"},
        {id: "true", label: "Ritual"},
        {id: "false", label: "No Ritual"},
    ]
    const schoolOptions = [
        {id: "", label: "All Schools"},
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
        {id: "", label: "All Levels"},
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
        {id: '', label: "All Sources"},
        {id: "PHB", label: "Player's Handbook"},
        {id: "AAG", label: "Astral Adventures Guide"},
        {id: "AI", label: "Acquisitions Inc."},
        {id: "FTD", label: "Fizban's Treasury of Dragons"},
        {id: "SCC", label: "Strixhaven: A Curriculum of Chaos"},
        {id: "TCE", label: "Tasha's Cauldron of Everything"},
    ]


    const [filters, setFilters] = useState<Filters>({ nome: "" });
    const [view, setView] = useState(false)
    const [slice, setSlice] = useState(40)
    const [filter, setFilter] = useState(false)
    
    const [Url, setUrl] = useState(`http://localhost:5000/api/spells/query`)

    //filter functions
    function handleOptionChangeName(event: ChangeEvent<HTMLInputElement>) {
        setFilters({ ...filters, nome: event.target.value });
      }
      
      function handleOptionChangeClass(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, classe: event.target.value });
      }
      
      function handleOptionChangeCasting(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, action: event.target.value });
      }
      
      function handleOptionChangeConcentration(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, concentration: event.target.value === "true" });
      }
      
      function handleOptionChangeRitual(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, ritual: event.target.value === "true" });
      }
      
      function handleOptionChangeLevel(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, level: parseInt(event.target.value) });
      }
      
      function handleOptionChangeSchool(event: ChangeEvent<HTMLSelectElement>) {
        setFilters({ ...filters, school: event.target.value });
      }
      function handleOptionChangeSource(event: ChangeEvent<HTMLSelectElement>) {
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
    function handleChangeView(){
        if(view){
            setView(false)
        }else if(!view){
            setView(true)
        }
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
            <div className={styles.button}>
                <button onClick={handleChangeView}>Resume View</button>
            </div>
            {filter && (
                <div className={styles.modal}>
                    <div className={styles.filters}>
                        <h3>Classes</h3>
                        <select onChange={handleOptionChangeClass}>
                        {classOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Casting Time</h3>
                        <select onChange={handleOptionChangeCasting}>
                        {castingOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Concentration</h3>
                        
                        <select onChange={handleOptionChangeConcentration}>
                        {concentrationOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Ritual</h3>
                        
                        <select onChange={handleOptionChangeRitual}>
                        {ritualOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Level</h3>
                        
                        <select onChange={handleOptionChangeLevel}>
                        {levelOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>School</h3>
                        
                        <select onChange={handleOptionChangeSchool}>
                        {schoolOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Source</h3>
                        
                        <select onChange={handleOptionChangeSource}>
                        {sourceOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            )}
            {!view && (
                <div className={styles.container}>
                    {data.map(spell => (
                        <SpellsBox spell={spell} key={spell.name}/>
                    ))}
                </div>
            )}
            {view && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>School</th>
                            <th>Con.</th>
                            <th>Level</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((spell, index)=>(
                            <SpellsTable spell={spell} key={index}/>
                        ))}
                    </tbody>
                </table>
            )}
        <Footer/>
        </>
    )
}