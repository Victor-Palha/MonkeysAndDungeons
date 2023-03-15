import Head from "next/head";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import styles from './styles.module.scss'
import { useState } from "react";

interface Monster{
    name: string;
    source: string;
    cr:{
        cr?: string;
        lair?: string;
        coven?: string;
    } | string;
    type: Type | string;
}
interface Type{
    type: string;
    tags: string[];
    cr?: string;
}

export default function Monsters(){


    const [sortCol, setSortCol] = useState<string>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [search, setSearch] = useState('')

    const {data, loading} = useFetch<Monster[]>('http://localhost:5000/api/monsters/query?nome='+search)
    //--

    function handleSort(colName: string) {
      if (sortCol === colName) {
        // Se a coluna já está selecionada, alterne a direção da ordenação
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
        // Se a coluna ainda não está selecionada, selecione-a e ordene em ordem ascendente
        setSortCol(colName);
        setSortDir('asc');
      }
    }
  
    const sortedData = data
      ? [...data].sort((a, b) => {
        
          const colA = a[sortCol as keyof Monster];
          const colB = b[sortCol as keyof Monster];

          if (typeof colA === 'string' && typeof colB === 'string') {
            return sortDir === 'asc' ? colA.localeCompare(colB) : colB.localeCompare(colA);

          } else if (typeof colA === 'string') {
            return sortDir === 'asc' ? -1 : 1;

          } else if (typeof colB === 'string') {
            return sortDir === 'asc' ? 1 : -1;
          } else{
            return 0;
          }
        })
      : [];
      //--

    if(loading){
        return (
            <>
                <Header/>
                    <h1 className={styles.loading}>Loading...</h1>
                <Footer/>
            </>
        )
    }
    return (
        <>
        <Header/>
        <Head><title>Monsters - Monkeys & Dungeons</title></Head>

            <form className={styles.search}>
                <input type="text" placeholder="Search Monster" onChange={(e)=>setSearch(e.target.value)}/>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('source')}>Source</th>
                        <th onClick={() => handleSort('type')}>Type</th>
                        <th onClick={() => handleSort('cr')}>CR</th>
                    </tr>
                </thead>
                <tbody>
            {sortedData?.map(monster => {
                return (
                        <tr>
                            <td>
                            <Link key={monster.name} href={{pathname: '/monster', query: {nome: monster.name, source: monster.source}}}>
                                {monster.name}
                            </Link>
                            </td>
                            <td>{monster.source}</td>
                            <td>
                            {monster.type
                                ? typeof monster.type === 'string'
                                ? monster.type
                                : monster.type.type
                                : ''}
                            </td>
                            <td>
                            {monster.cr
                                ? typeof monster.cr === 'string'
                                ? monster.cr
                                : monster.cr.cr
                                : ''}
                            </td>
                            
                        </tr>
                )
            })}
                </tbody>
            </table>
        <Footer/>
        </>
    )
}