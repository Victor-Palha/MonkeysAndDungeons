import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string, sear?: number){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<T | boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(url);
            if(sear > 0){
                setData(result.data.slice(0, sear));
            }
            else{
                setData(result.data);
            }
            setLoading(false);
        };

        fetchData();
    }, [url, sear]);
    
    return { data, loading };
}