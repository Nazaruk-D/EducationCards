import React, { useEffect, useState } from 'react'
import s from './HeadBlock.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../ActionsMenu/ActionsMenu'
import Button from '@mui/material/Button'
import { NavLink, useParams } from 'react-router-dom'
import { useModal } from '../../../../common/components/Modal/useModal'
import { AddCardModal } from '../../../modals/cardsModals/AddCardModal'

type HeadBlockPropsType = {
    userId: string
    packName: string
    packUserId: string
}

const HeadBlock: React.FC<HeadBlockPropsType> = React.memo(({ userId, packUserId, packName }) => {
    const { addCardModal, toggleAddCardModal } = useModal()
    const [name, setName] = useState('')
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const { urlPackId } = useParams<string>()

    const onClickHandler = () => {
        setCollapsed(!collapsed)
    }

    const inputClass = !collapsed ? s.active : s.nav

    useEffect(() => {
        if (packName === name || packName === '') {
            return
        }
        setName(packName)
    }, [packName])

    return (
        <div className={s.headBlock}>
            <h2 className={s.headName}>
                {name}
                {packUserId === userId && (
                    <div className={s.menuIcon}>
                        <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                        <div className={inputClass}>
                            <ActionsMenu packName={packName} />
                        </div>
                    </div>
                )}
            </h2>
            {packUserId && (
                <>
                    {packUserId === userId ? (
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={s.button}
                            onClick={toggleAddCardModal}
                        >
                            Add new card
                        </Button>
                    ) : (
                        <NavLink to={`/packs/learn/${urlPackId}`}>
                            <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                                Learn this pack
                            </Button>
                        </NavLink>
                    )}
                </>
            )}
            <AddCardModal title={'Add new card'} packId={urlPackId!} isShowing={addCardModal} hide={toggleAddCardModal} />
        </div>
    )
})

export default HeadBlock
