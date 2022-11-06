import React, { useEffect } from 'react'
import s from './CardsList.module.scss'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import HeadBlock from './HeadBlock/HeadBlock'
import { CardsTable } from './CardsTable/CardsTable'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { Search } from '../../../common/components/Search/Search'
import { getCardsTC } from './cards-reducer'
import { useParams } from 'react-router-dom'
import { setCardParams } from './cardParams-reducer'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'

export const CardsList = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.auth.user._id)
    const myCardPacks = useAppSelector((state) => state.cards.cards)
    const packUserId = useAppSelector((state) => state.cards.packUserId)
    const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount)
    const packName = useAppSelector((store) => store.cards.packName)
    const { urlPackId } = useParams<string>()
    const cardQuestion = useAppSelector((state) => state.cardParams.cardQuestion)
    const cardAnswer = useAppSelector((state) => state.cardParams.cardAnswer)
    const sortCards = useAppSelector((state) => state.cardParams.sortCards)
    const max = useAppSelector((state) => state.cardParams.max)
    const min = useAppSelector((state) => state.cardParams.min)
    const page = useAppSelector((state) => state.cardParams.page)
    const pageCount = useAppSelector((state) => state.cardParams.pageCount)
    const cardsPack_id = useAppSelector((state) => state.cardParams.cardsPack_id)

    const [searchValue, setSearchValue] = React.useState('')

    const cardParams = { cardsPack_id, cardQuestion, cardAnswer, sortCards, max, min, page, pageCount }

    useEffect(() => {
        dispatch(getCardsTC({ ...cardParams, cardsPack_id: urlPackId! }))
        return () => {}
    }, [cardsPack_id, cardQuestion, cardAnswer, sortCards, max, min, page, pageCount])
    console.log('cardlist')
    const valueFromPagination = {
        totalCount: cardsTotalCount,
        pageCount: pageCount,
        pagePack: page,
    }
    const setPaginationPage = (page: number) => {
        dispatch(setCardParams({ cardsPack_id, page }))
    }
    const setPageCount = (pageCount: number) => {
        dispatch(setCardParams({ pageCount, cardsPack_id }))
    }

    const searchCard = (searchValue: string) => {
        dispatch(setCardParams({ cardQuestion: searchValue, cardsPack_id: urlPackId! }))
    }

    const setFilterUpdateGrade = (sortCards: string) => {
        dispatch(setCardParams({ cardsPack_id: urlPackId!, sortCards }))
    }

    return (
        <div className={s.friendListContainer}>
            <BackPackArrow />
            <HeadBlock userId={userId} packName={packName} packUserId={packUserId} />
            <div className={s.descriptionBlock}>
                <span>Search</span>
            </div>
            <Search
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                searchPack={searchCard}
                searchStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '36px',
                    marginBottom: '25px',
                    marginTop: '9px',
                }}
            />
            <CardsTable
                userId={userId}
                myCardPacks={myCardPacks}
                setFilterUpdateGrade={setFilterUpdateGrade}
                packUserId={packUserId}
            />

            <PaginationBlock
                valueFromPagination={valueFromPagination}
                setPaginationPage={setPaginationPage}
                setPageCount={setPageCount}
            />
        </div>
    )
}
