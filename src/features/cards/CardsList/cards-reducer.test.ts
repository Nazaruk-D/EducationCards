import { CardType } from '../../../api/cardsAPI'
import { CardsInitialStateType, cardsReducer, setCardsAC } from './cards-reducer'

let startState: CardsInitialStateType = {
    cards: <CardType[]>[],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: null,
    packUpdated: null,
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
}

beforeEach(() => {
    startState = {
        cards: <CardType[]>[],
        packUserId: '',
        packName: '',
        packPrivate: false,
        packDeckCover: '',
        packCreated: null,
        packUpdated: null,
        page: 1,
        pageCount: 4,
        cardsTotalCount: 3,
        minGrade: 0,
        maxGrade: 6,
        token: '',
        tokenDeathTime: 0,
    }
})

it('should get all cards', () => {
    const endState = cardsReducer(
        startState,
        setCardsAC({
            cards: <CardType[]>[
                {
                    _id: 'kqw30923aw2',
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
                {
                    _id: '12324rlwe',
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
                    updated: null,
                    __v: 0,
                },
            ],
            packUserId: '',
            packName: '',
            packPrivate: true,
            packDeckCover: '',
            packCreated: null,
            packUpdated: null,
            page: 1,
            pageCount: 4,
            cardsTotalCount: 2,
            minGrade: 0,
            maxGrade: 6,
            token: '',
            tokenDeathTime: 0,
        })
    )

    expect(endState.cardsTotalCount).toBe(2)
    expect(endState.packPrivate).toBeTruthy()
    expect(endState.cards[0]._id).toBe('kqw30923aw2')
})
