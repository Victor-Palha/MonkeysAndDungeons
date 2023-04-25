export interface Monster{
    id: string
    name: string;
    source: string;
    cr:{
        cr?: string;
        lair?: string;
        coven?: string;
    } | string;
    type: Type | string;
    image: boolean;
    ext: string | null;
}
interface Type{
    type: string;
    tags: string[];
    cr?: string;
}