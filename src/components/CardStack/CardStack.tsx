import React, {useState} from 'react';
import {bounceOutDown} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';
import s from './CardStack.module.css'
import {cardData} from "./data";
import mood1 from '../../assets/smiles/mood-1.svg'
import mood2 from '../../assets/smiles/mood-2.svg'
import mood3 from '../../assets/smiles/mood-3.svg'
import mood4 from '../../assets/smiles/mood-4.svg'
import mood5 from '../../assets/smiles/mood-5.svg'

interface DataCard {
    text: string,
    id: number
}

interface ResultData {
    rate: number,
    id: number
}

const CardStack = (): any => {

    const [stack, setStack] = useState<DataCard[]>(cardData)
    const [results, setResults] = useState<ResultData[]>([])
    const [currentCardId, setCurrentCardId] = useState(0)

    const styles = StyleSheet.create({
        bounce: {
            animationName: bounceOutDown,
            animationDuration: '1s'
        }
    })

    const answerTheQuestion = (index: number) => {
        setCurrentCardId(currentCardId + 1)
        setTimeout(() => {
            const updatedStack = stack.filter(item => item.id !== index);
            setStack(updatedStack)

            if (updatedStack.length === 0) {
                setStack([{id: -1, text: 'End of quiz, your got ' +
                        results.reduce(function(sum: number, current) {
                            return sum + current.rate;
                        }, 0) +
                        ' points'}])
            }
        }, 800)
    }

    const saveInStorage = (cardID: number, rate: number) => {
          results?.push({id: cardID, rate: rate})
        console.log(results)
    }
    return (
        <div className={s.cardStackContainer}>
            {stack.map((card, index) => {
                return (
                    <div key={index} style={{marginTop: index / 2 + 'rem', marginLeft: index / 2 + 'rem'}}
                         className={`${6 - currentCardId === index ? css(styles.bounce) : ''} ${s.card}`}>
                        {card.text}
                        {card.id !== -1 && <div className={s.moodRatingButtonsContainer}>
                            <img onClick={() => {
                                answerTheQuestion(index)
                                saveInStorage(card.id, 1)
                            }} alt="vary bad mood" className={s.moodIcon}  src={mood1}/>
                            <img onClick={() => {
                                answerTheQuestion(index)
                                saveInStorage(card.id, 2)
                            }} alt="bad mood" className={s.moodIcon} src={mood2}/>
                            <img onClick={() => {
                                answerTheQuestion(index)
                                saveInStorage(card.id, 3)
                            }} alt="neutral mood" className={s.moodIcon} src={mood3}/>
                            <img onClick={() => {
                                answerTheQuestion(index)
                                saveInStorage(card.id, 4)
                            }} alt="good mood" className={s.moodIcon} src={mood4}/>
                            <img onClick={() => {
                                answerTheQuestion(index)
                                saveInStorage(card.id, 5)
                            }} alt="excellent mood" className={s.moodIcon} src={mood5}/>
                        </div>}
                    </div>
                )
            })}
        </div>

    )
}

export default CardStack
