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
import { setAppStatusAC } from '../../../app/app-reducer'

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
        case 'CARDS/UPDATE-CARD':
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card._id === action.cardId ? { ...card, grade: action.grade, shots: card.shots + 1 } : card
                ),
            }

        default:
            return state
    }
}

//Action creators
export const setCardsAC = (cards: GetCardsResponseType) => ({ type: 'CARDS/GET-CARDS', cards } as const)
export const resetCardAC = () => ({ type: 'CARDS/RESET-CARDS' } as const)
export const updadeCurrentCardAC = (grade: number, cardId: string) => ({ type: 'CARDS/UPDATE-CARD', grade, cardId } as const)

// Thunks
export const getCardsTC =
    (params?: GetCardParams): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI
            .getCards(params!)
            .then((res) => {
                dispatch(setCardsAC(res))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const updateCardTC =
    (updateCardData: UpdateCardData, params?: GetCardParams): AppThunk =>
    (dispatch) => {
        cardsAPI
            .updateCard(updateCardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }

export const removeCardTC =
    (id: string): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        cardsAPI
            .removeCard(id)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }
export const addCardTC =
    (cardData: CreateCardData): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        cardsAPI
            .createCard(cardData)
            .then(() => {
                dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
    }
export const gradeCardTC =
    (data: GradeDataType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const params = getState().cardParams
        dispatch(setAppStatusAC('loading'))
        cardsAPI
            .grageCard(data)
            .then(() => {
                // dispatch(getCardsTC(params))
            })
            .catch((err: any) => {
                let error = err.response.data.error
                console.log('catch, error:', error)
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

//Types
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof resetCardAC>
    | ReturnType<typeof updadeCurrentCardAC>
