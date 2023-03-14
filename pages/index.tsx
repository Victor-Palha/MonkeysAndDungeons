import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
//icons
import { FaDragon } from 'react-icons/fa'
import { FaMagic } from 'react-icons/fa'
import { FaGem } from 'react-icons/fa'
import { FaDungeon } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <Head><title>Home - Monkeys & Dungeons</title></Head>
      <Header/>
      <main className={styles.container}>
        <div className={styles.box}>
          <FaDragon/>
          <h3>Monsters</h3>
        </div>
        <div className={styles.box}>
          <FaMagic/>
          <h3>Spells</h3>
        </div>
        <div className={styles.box}>
          <FaGem/>
          <h3>Items</h3>
        </div>
        <div className={styles.box}>
          <FaDungeon/>
          <h3>Adventures</h3>
        </div>
      </main>
      <Footer/>
    </>
  )
}
