import React, {useState} from 'react';
import {bounceOutDown} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';
import s from './CardStack.module.css'
import {cardData, SmileIcon, smileIcons} from "./data";
import repeatIcon from '../../assets/arrow-repeat.svg'
import saveIcon from '../../assets/save.svg'
import playIcon from '../../assets/play.svg'
import {ScaleLoader} from "react-spinners";
import {TileDocument} from '@ceramicnetwork/stream-tile'
import {ceramic} from "../../ceramic/Auth";

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
    const [quizResults, setQuizResult] = useState<ResultData[]>([])
    const [currentCardId, setCurrentCardId] = useState(0)
    const [isCardAnimationPlaying, setIsCardAnimationPlaying] = useState(true)
    const [isFirstTimeQuiz, setIsFirstTimeQuiz] = useState(true)
    const [isPostingResult, setIsPostingResult] = useState(false)
    const [document, setDocument] = useState();

    const [Data, setData] = useState();

    const styles = StyleSheet.create({
        bounce: {
            animationName: bounceOutDown,
            animationDuration: '1s'
        }
    })

    const writeResult = async () => {
        setIsPostingResult(true)
        setTimeout(() => {
            setIsPostingResult(false)
        }, 2000)



        const doc = await TileDocument.create(
            ceramic,
            null,
            {
                // @ts-ignore
                controllers: [ceramic?.did?.id],
                deterministic: true
            },
            {anchor: false, publish: false}
        )
        // @ts-ignore
        console.log(doc.content.score)
        {
            setData(
                {
                    // @ts-ignore
                    score: quizResults.reduce(function (sum: number, current) {
                        return sum + current.rate;
                    }, 0)
                }
            )
        }
        // @ts-ignore
        setDocument(doc)

        function handleSubmit() {

            let Data = {
                score: quizResults.reduce(function (sum: number, current) {
                    return sum + current.rate;
                }, 0)
            }

            // @ts-ignore
            setData(Data)

            if (Data) {
                (async () => {
                    // @ts-ignore
                    await document?.update(Data);
                })();
            }
        }

        handleSubmit()
    }

    const answerTheQuestion = (index: number, rate: number) => {
        setIsCardAnimationPlaying(false)
        setCurrentCardId(currentCardId + 1)
        setTimeout(() => {
            const updatedStack = stack.filter(item => item.id !== index);
            setStack(updatedStack)

            if (updatedStack.length === 0) {
                setStack([{
                    id: -1, text: 'Your score: ' + quizResults.reduce(function (sum: number, current) {
                        return sum + current.rate;
                    }, 0) + ' points. Come back tomorrow!'
                }])
            }
            setIsCardAnimationPlaying(true)
            quizResults?.push({id: 6 - index, rate: rate})
            console.log(quizResults)
        }, 800)
    }

    const replayQuiz = () => {
        setCurrentCardId(0)
        setStack(cardData)
        setQuizResult([])
    }

    return (
        <div className={s.cardStackContainer}>
            {isFirstTimeQuiz ?
                <div className={s.startQuizButton}
                     onClick={() => setIsFirstTimeQuiz(false)}>
                    <img className={s.playQuizIcon} src={playIcon} alt="start quiz"/>
                    <span className={s.startQuizText}>Start Quiz</span>
                </div> :
                stack.map((card: DataCard, index: number) => {
                    return (
                        <div key={index} style={{marginTop: index / 2 + 'rem', marginLeft: index / 2 + 'rem'}}
                             className={`${6 - currentCardId === index && stack[0].id !== -1 ? css(styles.bounce) : ''} ${s.card}`}>
                            {card.text}
                            <div className={s.moodRatingButtonsContainer}>
                                {stack[0].id !== -1 ? smileIcons.map((smileIcon: SmileIcon) =>
                                    <img key={smileIcon.src} onClick={() => {
                                        if (isCardAnimationPlaying) {
                                            stack.length !== 0 && answerTheQuestion(index, smileIcon.rate)
                                        }
                                    }} alt={smileIcon.alt} className={s.moodIcon} src={smileIcon.src}/>
                                ) : <div>
                                    <div className={s.lastAttemptsContainer}>
                                        <span className={s.lastAttemptsTitle}>Last attempts:</span>
                                        <div className={s.lastAttempts}>
                                            <span className={s.attempt}>1: 19 points</span>
                                            <span className={s.attempt}>2: 11 points</span>
                                            <span className={s.attempt}>3: 12 points</span>
                                            <span className={s.attempt}>4: 7 points</span>
                                        </div>
                                    </div>
                                    <div className={s.resultBtn} onClick={() => {
                                        writeResult()
                                    }}>
                                        <img alt="save in ceramic store" className={s.resultIcon} src={saveIcon}/>

                                        {isPostingResult ?
                                            <div className={s.loader}>
                                                <ScaleLoader/>
                                            </div> :
                                            <span className={s.resultBtnText}>Save result in DID DataStore</span>}
                                    </div>
                                    <div className={s.resultBtn} onClick={() => replayQuiz()}>
                                        <img className={s.resultIcon} alt="repeat" src={repeatIcon}/>
                                        <span className={s.resultBtnText}>Repeat</span>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default CardStack
