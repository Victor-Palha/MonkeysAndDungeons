//Spells Box
export interface ISpellsToBox{
    id: string
    name: string;
    source: string;
    level: number;
    ritual: boolean;
    concentration: boolean;
    classes: string[];
    school: string;
}
//Spell Item
export interface ISpellItem{
    id: string
    name: string;
    source: string;
    level: number;
    school: string;
    ritual: boolean;
    casting_time: string;
    range: string;
    components: string;
    duration: Duration;
    description: string;
    higher_level?: string;
    tables?: Tables;
    classes: string[];
}
interface Duration{
    time: string;
    concentration: boolean;
}
interface Tables{
    header: string[];
    rows: string[][];
}
