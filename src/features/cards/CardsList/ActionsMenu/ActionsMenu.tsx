import React from 'react'
import s from './ActionsMenu.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { NavLink, useParams } from 'react-router-dom'
import { useModal } from '../../../../common/components/Modal/useModal'
import { EditPackModal } from '../../../modals/packsModals/EditPackModal'
import { RemovePackModal } from '../../../modals/packsModals/RemovePackModal'
import { useAppSelector } from '../../../../app/store'

type ActionMenuPropsType = {
    packName: string
}

export const ActionsMenu: React.FC<ActionMenuPropsType> = ({ packName }) => {
    const { urlPackId } = useParams<string>()

    const { editPackModal, toggleEditPackModal } = useModal()
    const { removePackModal, toggleRemovePackModal } = useModal()

    // const cardPacks = useAppSelector((state) => state.packs.cardPacks)
    // const avatar = cardPacks.filter((pack) => (pack._id === urlPackId ? pack.deckCover : null))
    // const isPrivate = cardPacks.filter((pack) => (pack._id === urlPackId ? pack.private : null))

    // console.log('cardPacks', cardPacks)
    // console.log('avatar', avatar)
    // console.log('isPrivate', isPrivate)

    return (
        <div>
            <div className={s.mainContainer}>
                <div className={s.linkBlock}>
                    <BorderColorIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span onClick={toggleEditPackModal} className={s.text}>
                        Edit
                    </span>
                </div>
                <div className={s.linkBlock}>
                    <DeleteForeverIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                    <span onClick={toggleRemovePackModal} className={s.text}>
                        Delete
                    </span>
                </div>
                <NavLink to={`/packs/learn/${urlPackId}`}>
                    <div className={s.linkBlock}>
                        <SchoolIcon fontSize={'small'} style={{ marginRight: '15px', marginLeft: '12px' }} />
                        <span className={s.text}>Learn</span>
                    </div>
                </NavLink>
            </div>
            {editPackModal && (
                //to render only 1 time. when toggleEditPackModal is clicked, it sets editPackModal to true
                <EditPackModal
                    title="Edit pack"
                    isShowing={editPackModal}
                    hide={toggleEditPackModal}
                    id={urlPackId!}
                    packName={packName}
                    //TODO
                    //correct
                    avatar={'correct it'}
                    isPrivate={false}
                />
            )}

            {removePackModal && (
                //to render only 1 time. when toggleRemovePackModal is clicked, it sets removePackModal to true

                <RemovePackModal
                    title="Delete pack"
                    id={urlPackId!}
                    packName={packName}
                    isShowing={removePackModal}
                    hide={toggleRemovePackModal}
                />
            )}
        </div>
    )
}
