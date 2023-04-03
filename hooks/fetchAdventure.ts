import axios from "axios";
import { useEffect, useState } from "react";


export function useAdventure(type: string){

    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setData('')
            setLoading(true);
            const result = await axios("http://localhost:5000/api/adventure?type="+type);
            setData(result.data);
            setLoading(false)

        };

        fetchData();
    }, [type]);
    
    return { data, loading };
}