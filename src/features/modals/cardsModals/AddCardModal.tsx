import React from 'react'
import { FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch } from '../../../app/store'
import { BasicModal } from '../../../common/components/Modal/BasicModal'
import { addCardTC } from '../../cards/CardsList/cards-reducer'

type AddCardModalType = {
    title: string
    packId: string
    isShowing: boolean
    hide: () => void
}

export const AddCardModal = (props: AddCardModalType) => {
    const dispatch = useAppDispatch()

    let [question, setQuestion] = React.useState('')
    let [answer, setAnswer] = React.useState('')
    const [text, setText] = React.useState('')

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
                cardsPack_id: props.packId,
                question: question,
                answer: answer,
                // answerImg: 'url or base 64',
                // questionImg: 'url or base 64',
                // questionVideo: 'url or base 64',
                // answerVideo: 'url or base 64',
            },
        }
        dispatch(addCardTC(newCard))
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
