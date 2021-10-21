import React, { useState } from 'react';
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

interface SmileIcon {
    src: any,
    alt?: string,
    rate: number
}


const CardStack = (): any => {

    const [stack, setStack] = useState<DataCard[]>(cardData)
    const [results,] = useState<ResultData[]>([])
    const [currentCardId, setCurrentCardId] = useState(0)
    const [isCardAnimationPlaying, setIsCardAnimationPlaying] = useState(true)
    const smileIcons: SmileIcon[] = [
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

    const styles = StyleSheet.create({
        bounce: {
            animationName: bounceOutDown,
            animationDuration: '1s'
        }
    })

    const answerTheQuestion = (index: number, rate: number) => {
        setIsCardAnimationPlaying(false)
        setCurrentCardId(currentCardId + 1)
        setTimeout(() => {
            const updatedStack = stack.filter(item => item.id !== index);
            setStack(updatedStack)

            if (updatedStack.length === 0) {
                setStack([{
                    id: -1, text: 'End of quiz, your got ' +
                        results.reduce(function (sum: number, current) {
                            return sum + current.rate;
                        }, 0) +
                        ' points'
                }])
            }
            setIsCardAnimationPlaying(true)
            results?.push({id: 6 - index, rate: rate})
        }, 800)
    }

    return (
        <div className={s.cardStackContainer}>
            {stack.map((card: DataCard, index: number) => {
                return (
                    <div key={index} style={{marginTop: index / 2 + 'rem', marginLeft: index / 2 + 'rem'}}
                         className={`${6 - currentCardId === index ? css(styles.bounce) : ''} ${s.card}`}>
                        {card.text}
                        <div className={s.moodRatingButtonsContainer}>
                            {smileIcons.map((smileIcon: SmileIcon) =>
                                <img key={smileIcon.src} onClick={() => {
                                    if (isCardAnimationPlaying) {
                                        stack.length !== 0 && answerTheQuestion(index, smileIcon.rate)
                                    }
                                }} alt={smileIcon.alt} className={s.moodIcon} src={smileIcon.src}/>
                            )}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default CardStack
