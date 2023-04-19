import Head from "next/head";
import styles from './styles.module.scss'
//Components
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
//Hooks
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect, ChangeEvent } from "react";

//interface
import { Monster } from "@/interfaces/Imonster";
import MonsterBox from "../../components/MonsterBox";
import Loading from "@/components/Loading";
import { Filters } from "@/interfaces/Ifilters";
import { AiFillFilter } from "react-icons/ai";
import { FcClearFilters } from "react-icons/fc";




export default function Monsters(){
    const TypeOptions = [
        {id: "", label: "All Types"},
        {id: "Aberration", label: "Aberration"},
        {id: "Beast", label: "Beast"},
        {id: "Celestial", label: "Celestial"},
        {id: "Construct", label: "Construct"},
        {id: "Dragon", label: "Dragon"},
        {id: "Elemental", label: "Elemental"},
        {id: "Fey", label: "Fey"},
        {id: "Fiend", label: "Fiend"},
        {id: "Giant", label: "Giant"},
        {id: "Humanoid", label: "Humanoid"},
        {id: "Monstrosity", label: "Monstrosity"},
        {id: "Ooze", label: "Ooze"},
        {id: "Plant", label: "Plant"},
        {id: "Undead", label: "Undead"},
    ]
    const CrOptions = [
        {id: "", label: "All Crs"},
        {id: "1/8", label: "1/8"},
        {id: "1/4", label: "1/4"},
        {id: "1/2", label: "1/2"},
        {id: "1", label: "1"},
        {id: "2", label: "2"},
        {id: "3", label: "3"},
        {id: "4", label: "4"},
        {id: "5", label: "5"},
        {id: "6", label: "6"},
        {id: "7", label: "7"},
        {id: "8", label: "8"},
        {id: "9", label: "9"},
        {id: "10", label: "10"},
        {id: "11", label: "11"},
        {id: "12", label: "12"},
        {id: "13", label: "13"},
        {id: "14", label: "14"},
        {id: "15", label: "15"},
        {id: "16", label: "16"},
        {id: "17", label: "17"},
        {id: "18", label: "18"},
        {id: "19", label: "19"},
        {id: "20", label: "20"},
        {id: "21", label: "21"},
        {id: "22", label: "22"},
        {id: "23", label: "23"},
        {id: "24", label: "24"},
        {id: "25", label: "25"},
        {id: "26", label: "26"},
        {id: "27", label: "27"},
        {id: "28", label: "28"},
        {id: "29", label: "29"},
        {id: "30", label: "30"},
    ]
    const ImageOptions = [
        {id: "", label: "Image or No Image"},
        {id: "true", label: "Has Image"},
        {id: "false", label: "Has Not Image"},
    ]
    const SourceOptions = [
        {id: "", label: "All Sources"},
        {id: "MM", label: "Monster Manual"},
        {id: "MPMM", label: "Mordenkainen's Presents: Monsters of the Multiverse"},
        {id: "VRGR", label: "Van Richten's Guide to Ravenloft"},
    ]

    const [slice, setSlice] = useState(20)
    const [search, setSearch] = useState('')
    //filters
    const [filters, setFilters] = useState<Filters>({ nome: "" });
    const [filter, setFilter] = useState(false)
    //url
    const [Url, setUrl] = useState(`http://localhost:5000/api/monsters/query`)

        //filter functions
        function handleFilters(){
            setFilters({nome: ""})
            setFilter(false)
        }
        function handleOptionChangeName(event: ChangeEvent<HTMLInputElement>) {
            setFilters({ ...filters, nome: event.target.value });
          }
          
          function handleOptionChangeType(event: ChangeEvent<HTMLSelectElement>) {
            setFilters({ ...filters, type: event.target.value });
          }
          
          function handleOptionChangeCr(event: ChangeEvent<HTMLSelectElement>) {
            setFilters({ ...filters, cr: event.target.value });
          }
          
          function handleOptionChangeImage(event: ChangeEvent<HTMLSelectElement>) {
            setFilters({ ...filters, image: event.target.value === "true" });
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
    
    //fetch data
    useEffect(() => {
        const url = new URL("http://localhost:5000/api/monsters/query");
        const params = new URLSearchParams(filters as any);
      
        url.search = params.toString();
      
        setUrl(url.toString());
      }, [filters]);

    const {data, loading} = useFetch<Monster[]>(Url, slice)

    if(loading){
        return (
            <>
                <Header/>
                    <Loading/>
                <Footer/>
            </>
        )
    }
    return (
        <>
        <Header main={true}/>
        <Head><title>Monsters - Monkeys & Dungeons</title></Head>

            <form className={styles.search}>
                <input type="text" placeholder="Search Monster" onChange={handleOptionChangeName}/>
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
                        <h3>Types</h3>
                        <select onChange={handleOptionChangeType}>
                        {TypeOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>CR</h3>
                        <select onChange={handleOptionChangeCr}>
                        {CrOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Image</h3>
                        
                        <select onChange={handleOptionChangeImage}>
                        {ImageOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className={styles.filters}>
                        <h3>Ritual</h3>
                        
                        <select onChange={handleOptionChangeSource}>
                        {SourceOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>)}
            <div className={styles.container}>
            {data?.map(monster => {
                    return (
                        <MonsterBox monster={monster} key={monster.name}/>
                    )
                })}
                
            </div>
        <Footer/>
        </>
    )
}