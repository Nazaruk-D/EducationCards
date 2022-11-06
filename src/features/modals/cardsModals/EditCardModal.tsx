import React, { useEffect } from 'react'
import { FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch } from '../../../app/store'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { updateCardTC } from '../../cards/CardsList/cards-reducer'

type EditCardModalType = {
    title: string
    packId: string
    id: string
    question: string
    answer: string
    isShowing: boolean
    hide: () => void
}

export const EditCardModal = (props: EditCardModalType) => {
    const dispatch = useAppDispatch()

    let [question, setQuestion] = React.useState('')
    let [answer, setAnswer] = React.useState('')
    const [text, setText] = React.useState('')

    useEffect(() => {
        setQuestion(props.question)
        setAnswer(props.answer)
    }, [props.question, props.answer]) //to get data from props

    const setQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const setAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setText(event.target.value)
    }

    const addNewCard = () => {
        const newCard = {
            card: {
                _id: props.id,
                question: question,
                answer: answer,
                comments: '',
                // questionImg: 'url or base 64',
                // answerImg: 'url or base 64',
            },
        }
        dispatch(updateCardTC(newCard, { cardsPack_id: props.packId }))
        setQuestion('')
        setAnswer('')
    }

    return (
        <BasicModal title={props.title} onSaveClick={addNewCard} isShowing={props.isShowing} hide={props.hide}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Choose a question format
                </InputLabel>
                <NativeSelect
                    defaultValue="text"
                    inputProps={{
                        name: 'text',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'text'}>Text</option>
                    <option value={'picture'}>Picture</option>
                </NativeSelect>
            </FormControl>
            <TextField variant="standard" label="Question" value={question} onChange={setQuestionHandler} />
            <TextField variant="standard" label="Answer" value={answer} onChange={setAnswerHandler} />
        </BasicModal>
    )
}
