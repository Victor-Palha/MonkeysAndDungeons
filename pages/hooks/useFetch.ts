import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<T | boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(url);
            setData(result.data);
            setLoading(false);
        };
        fetchData();
    }, [url]);
    
    return { data, loading };
}