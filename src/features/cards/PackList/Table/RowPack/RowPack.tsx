import React, { useCallback } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { NavLink } from 'react-router-dom'
import s from './RowPack.module.scss'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { PackType } from '../../../../../api/packsAPI'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { setCardParams } from '../../../CardsList/cardParams-reducer'
import { useModal } from '../../../../../common/components/Modal/useModal'
import { RemovePackModal } from '../../../../modals/packsModals/RemovePackModal'
import { EditPackModal } from '../../../../modals/packsModals/EditPackModal'

type RowPropsType = {
    row: PackType
}

const RowPack: React.FC<RowPropsType> = React.memo(({ row }) => {
    const { removePackModal, toggleRemovePackModal } = useModal()
    const { editPackModal, toggleEditPackModal } = useModal()

    const dispatch = useAppDispatch()
    const userId = useAppSelector((store) => store.auth.user._id)

    const setPackId = useCallback(
        (id: string, userId: string) => {
            dispatch(setCardParams({ cardsPack_id: id }))
        },
        [dispatch]
    )

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('ru', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    const classEducation = row.cardsCount > 0 ? s.schoolIcon : s.blockSchoolIcon
    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {row.cardsCount === 0 ? (
                        <NavLink
                            to={`/no-cards/${row._id}`}
                            className={s.navLink}
                            onClick={() => setPackId(row._id, row.user_id)}
                        >
                            {row.name}
                        </NavLink>
                    ) : (
                        <NavLink
                            to={`/packs/my-packs/${row._id}`}
                            className={s.navLink}
                            onClick={() => setPackId(row._id, row.user_id)}
                        >
                            {row.name}
                        </NavLink>
                    )}
                </TableCell>
                <TableCell align="left">{row.cardsCount}</TableCell>
                <TableCell align="left">{formatDate(row.updated)}</TableCell>
                <TableCell align="left">{row.user_name}</TableCell>
                <TableCell align="left">
                    <div className={s.actions}>
                        <div className={classEducation}>
                            {row.cardsCount > 0 ? (
                                <NavLink to={`/packs/learn/${row._id}`}>
                                    <SchoolIcon fontSize={'small'} style={{ color: 'black' }} />
                                </NavLink>
                            ) : (
                                <SchoolIcon fontSize={'small'} style={{ color: 'black' }} />
                            )}
                        </div>
                        <div className={s.editIcon}>
                            {row.user_id === userId && (
                                <BorderColorIcon fontSize={'small'} onClick={toggleEditPackModal} style={{ color: 'black' }} />
                            )}
                        </div>
                        <div className={s.deleteIcon}>
                            {row.user_id === userId && (
                                <DeleteForeverIcon
                                    fontSize={'small'}
                                    onClick={toggleRemovePackModal}
                                    style={{ color: 'black' }}
                                />
                            )}
                        </div>
                    </div>
                </TableCell>
            </TableRow>

            {editPackModal && (
                //to render only 1 time. when toggleEditPackModal is clicked, it sets editPackModal to true
                <EditPackModal
                    title="Edit pack"
                    isShowing={editPackModal}
                    hide={toggleEditPackModal}
                    id={row._id}
                    packName={row.name}
                />
            )}

            {removePackModal && (
                //to render only 1 time. when toggleRemovePackModal is clicked, it sets removePackModal to true

                <RemovePackModal
                    title="Delete pack"
                    id={row._id}
                    packName={row.name}
                    isShowing={removePackModal}
                    hide={toggleRemovePackModal}
                />
            )}
        </>
    )
})

export default RowPack
