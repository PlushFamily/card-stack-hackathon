import mood1 from "../../assets/smiles/mood-1.svg";
import mood2 from "../../assets/smiles/mood-2.svg";
import mood3 from "../../assets/smiles/mood-3.svg";
import mood4 from "../../assets/smiles/mood-4.svg";
import mood5 from "../../assets/smiles/mood-5.svg";

export interface DataCard {
    text: string,
    id: number
}

export interface SmileIcon {
    src: any,
    alt?: string,
    rate: number
}

export const cardData: DataCard[] = [
    {
        id: 0,
        text: 'Are you outgoing & energetic today?'
    },
    {
        id: 1,
        text: 'Are you friendly and compassionate today?'
    },
    {
        id: 2,
        text: 'Are you inventive & curious today?'
    },
    {
        id: 3,

        text: 'Are you sensitive & nervous today?'
    },
    {
        id: 4,
        text: 'Are you Organized & dependable today?'
    },
    {
        id: 5,
        text: 'How do you feel today?'
    },
]

export const smileIcons: SmileIcon[] = [
    {
        src: mood1,
        alt: 'vary bad mood',
        rate: 1
    },
    {
        src: mood2,
        alt: 'bad mood',
        rate: 2
    },
    {
        src: mood3,
        alt: 'neutral mood',
        rate: 3
    },
    {
        src: mood4,
        alt: 'good mood',
        rate: 4
    },
    {
        src: mood5,
        alt: 'excellent mood',
        rate: 5
    }
]