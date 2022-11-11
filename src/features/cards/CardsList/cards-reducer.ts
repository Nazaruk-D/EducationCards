import {
    cardsAPI,
    CardType,
    CreateCardData,
    GetCardParams,
    GetCardsResponseType,
    GradeDataType,
    UpdateCardData,
} from '../../../api/cardsAPI'
import { AppRootStateType, AppThunk } from '../../../app/store'
import { setAppStatusAC, setErrAC } from '../../../app/app-reducer'

const initialState = {
    cards: <CardType[]>[
        {
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
        },
    ],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: null,
    packUpdated: null,
    page: 1,
    pageCount: 8,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
}
export type CardsInitialStateType = typeof initialState
export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionsType): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/GET-CARDS':
            return <CardsInitialStateType>{ ...action.cards }
        // return {...action.cards}
        case 'CARDS/RESET-CARDS':
            const initialValue = {
                cards: <CardType[]>[
                    {
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
                    },
                ],
                packUserId: '',
                packName: '',
                packPrivate: false,
                packDeckCover: '',
                packCreated: null,
                packUpdated: null,
                page: 1,
                pageCount: 8,
                cardsTotalCount: 0,
                minGrade: 0,
                maxGrade: 0,
                token: '',
                tokenDeathTime: 0,
            }
            return initialValue
        default:
            return state
    }
}

//Action creators
export const getCardsAC = (cards: GetCardsResponseType) => ({ type: 'CARDS/GET-CARDS', cards } as const)
export const resetCardAC = () => ({ type: 'CARDS/RESET-CARDS' } as const)

// Thunks
export const getCardsTC =
    (params?: GetCardParams): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))

        cardsAPI
            .getCards(params!)
            .then((res) => {
                dispatch(getCardsAC(res))
            })
            .catch((err: any) => {
                const error = err.response.data.error
                dispatch(setErrAC(error))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const updateCardTC =
    (updateCardData: UpdateCardData, params?: GetCardParams): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))

        cardsAPI
            .updateCard(updateCardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                const error = err.response.data.error
                dispatch(setErrAC(error))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const removeCardTC =
    (id: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        dispatch(setAppStatusAC('loading'))

        cardsAPI
            .removeCard(id)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                const error = err.response.data.error
                dispatch(setErrAC(error))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const addCardTC =
    (cardData: CreateCardData): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        dispatch(setAppStatusAC('loading'))

        cardsAPI
            .createCard(cardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                const error = err.response.data.error
                dispatch(setErrAC(error))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }
export const gradeCardTC =
    (data: GradeDataType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        dispatch(setAppStatusAC('loading'))
        cardsAPI
            .grageCard(data)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                const error = err.response.data.error
                dispatch(setErrAC(error))
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

//Types
export type CardsActionsType = ReturnType<typeof getCardsAC> | ReturnType<typeof resetCardAC>
