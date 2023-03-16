import { useRouter } from "next/router"
import { useFetch } from "../hooks/useFetch"
export default function Monster(){
    const router = useRouter()
    const {nome, source} = router.query
    //API GET
    //const {data, loading} = useFetch('http://localhost:5000/api/monsters/query?nome='+search)

    return (
        <>
            <h1>Hello World from Monster</h1>
            <p>{nome} -=-=- {source}</p>
        </>
    )
}