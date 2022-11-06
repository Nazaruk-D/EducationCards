import React, { useEffect } from 'react'
import s from './PackList.module.scss'
import { Navigate } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SettingsBlock } from './SettingsBlock/SettingsBlock'
import { PackListTable } from './Table/PackListTable'
import { PaginationBlock } from '../../../common/components/PaginationBlock/PaginationBlock'
import { getPacksTC, resetPackAC } from './packs-reducer'
import { GetPackParams } from '../../../api/packsAPI'
import { setSetting } from './SettingsBlock/setting-reducer'
import { Button } from '@mui/material'
import { useModal } from '../../../common/components/Modal/useModal'
import { AddPackModal } from '../../modals/packsModals/AddPackModal'

export const PackList = React.memo(() => {
    const { addPackModal, toggleAddPackModal } = useModal()

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userId = useAppSelector((state) => state.auth.user._id)

    const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount)
    const cardPacks = useAppSelector((store) => store.packs.cardPacks)

    const pageCount = useAppSelector((state) => state.setting.pageCount)
    const pagePack = useAppSelector((state) => state.setting.page)
    const packName = useAppSelector((state) => state.setting.packName)
    const min = useAppSelector((state) => state.setting.min)
    const max = useAppSelector((state) => state.setting.max)
    const block = useAppSelector((state) => state.setting.block)
    const user_id = useAppSelector((state) => state.setting.user_id)
    const sortPacks = useAppSelector((state) => state.setting.sortPacks)

    const settingData = { user_id, pageCount, page: pagePack, packName, min, max, block, sortPacks }
    useEffect(() => {
        dispatch(getPacksTC(settingData))
        return () => {
            dispatch(resetPackAC())
        }
    }, [user_id, pageCount, pagePack, packName, min, max, block, sortPacks])
    console.log('packlist')
    const valueFromPagination = { totalCount: cardPacksTotalCount, pageCount, pagePack }
    const setPaginationPage = (page: number) => {
        dispatch(setSetting({ page }))
    }

    const filterWithSlider = (value: GetPackParams) => {
        dispatch(setSetting(value))
    }

    const resetPackListFilter = (data: GetPackParams) => {
        dispatch(setSetting(data))
    }

    const setFilterPack = (user_id: string, page: number) => {
        dispatch(setSetting({ user_id, page }))
    }

    const setFilterUpdatePack = (user_id: string, sortPacks: string) => {
        dispatch(setSetting({ user_id, sortPacks }))
    }

    const searchPack = (searchValue: string) => {
        dispatch(setSetting({ packName: searchValue }))
    }

    const setPageCount = (pageCount: number) => {
        dispatch(setSetting({ pageCount }))
    }
    if (!isLoggedIn) {
        return <Navigate to={routes.login} />
    }

    return (
        <div className={s.packListContainer}>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Pack list</h2>
                <AddPackModal title="Add new pack" isShowing={addPackModal} hide={toggleAddPackModal} />
                <Button type={'button'} variant={'contained'} color={'primary'} className={s.button} onClick={toggleAddPackModal}>
                    Add new pack
                </Button>
            </div>
            <SettingsBlock
                searchPack={searchPack}
                setFilterPack={setFilterPack}
                resetPackListFilter={resetPackListFilter}
                filterWithSlider={filterWithSlider}
            />
            <PackListTable user_id={user_id} userId={userId} cardPacks={cardPacks} setFilterUpdatePack={setFilterUpdatePack} />
            <PaginationBlock
                valueFromPagination={valueFromPagination}
                setPaginationPage={setPaginationPage}
                setPageCount={setPageCount}
            />
        </div>
    )
})
