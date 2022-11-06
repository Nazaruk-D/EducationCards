import React, { useEffect, useState } from 'react'
import s from './LearnPage.module.scss'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import { Paper, Radio, RadioGroup } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getCardsTC, gradeCardTC, setCardsAC, updadeCurrentCardAC } from '../CardsList/cards-reducer'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { CardType } from '../../../api/cardsAPI'

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return { sum: newSum, id: newSum < rand ? i : acc.id }
        },
        { sum: 0, id: -1 }
    )
    return cards[res.id + 1]
}
type LearnPagePropsType = {}

export const LearnPage: React.FC<LearnPagePropsType> = ({}) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector((store) => store.cards.packName)
    const cards = useAppSelector((state) => state.cards.cards)
    const { urlPackId } = useParams<string>()

    const [showAnswer, setShowAnswer] = useState(false)
    const [gradeValue, setGradeValue] = useState(0)
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        questionImg: '',
        answerImg: '',
        answerVideo: '',
        questionVideo: '',
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: null,
        updated: '',
        __v: 0,
    })
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        if (firstLoad) {
            dispatch(getCardsTC({ cardsPack_id: urlPackId!, pageCount: 1000 }))
            setFirstLoad(false)
        }
        if (cards.length > 0) {
            setCard(getCard(cards))
        }
    }, [dispatch, firstLoad, cards, urlPackId])

    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGradeValue(+e.currentTarget.value)
    }

    const showAnswerHandler = () => {
        setShowAnswer(true)
    }

    const nextAnswerHandler = () => {
        dispatch(gradeCardTC({ grade: gradeValue, card_id: card._id }))
        dispatch(updadeCurrentCardAC(gradeValue, card._id))
        setCard(getCard(cards))
        setShowAnswer(false)
    }

    return (
        <div className={s.learnContainer}>
            <BackPackArrow />
            <h2 className={s.headName}>Learn {packName}</h2>
            <Paper className={s.paper} elevation={3}>
                <div className={s.question}>
                    <b>Question: </b> {card.question}{' '}
                </div>
                <div className={s.attempts}>Количество попыток ответов на вопрос: {card.shots}</div>
                {!showAnswer ? (
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        className={s.button}
                        onClick={showAnswerHandler}
                    >
                        Show answer
                    </Button>
                ) : (
                    <>
                        <div className={s.answer}>
                            <b>Answer: </b> {card.answer}
                        </div>
                        <div className={s.rate}>Rate yourself:</div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="radio-buttons-group"
                                onChange={onChangeRadio}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Did not know" />
                                <FormControlLabel value="2" control={<Radio />} label="Forgot" />
                                <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
                                <FormControlLabel value="4" control={<Radio />} label="Confused" />
                                <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={s.button}
                            onClick={nextAnswerHandler}
                        >
                            Next
                        </Button>
                    </>
                )}
            </Paper>
        </div>
    )
}
