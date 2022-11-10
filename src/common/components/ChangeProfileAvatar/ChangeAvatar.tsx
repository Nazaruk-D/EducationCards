import React, { ChangeEvent } from 'react'
import s from './ChangeAvatar.module.scss'
import AvatarImage from '../../assets/image/avatar.jpg'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { updateUser } from '../../../features/auth/auth-reducer'
import { setErrAC } from '../../../app/app-reducer'
type RenderComponent = 'Profile' | 'Header'

type ChangeProfileAvatarPropsType = {
    renderComponent: RenderComponent
}
export const ChangeAvatar: React.FC<ChangeProfileAvatarPropsType> = ({ renderComponent }) => {
    const dispatch = useAppDispatch()
    const avatar = useAppSelector((state) => state.auth.user.avatar)
    const [isAvaBroken, setIsAvaBroken] = React.useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            // console.log('file: ', file)

            if (file.size < 1000000) {
                convertFileToBase64(file, (file64: string) => {
                    // console.log('file64: ', file64)
                    dispatch(updateUser({ avatar: file64 }))
                })
            } else {
                dispatch(setErrAC('Error: Файл слишком большого размера'))
                // console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }
    const errorHandler = () => {
        setIsAvaBroken(true)
    }
    const vievAvatar = isAvaBroken ? AvatarImage : avatar

    const imgStyle = renderComponent === 'Profile' ? s.imgProfile : s.imgHeader
    return (
        <div className={s.imageContainer}>
            <img className={imgStyle} alt="my avatar" src={vievAvatar} onError={errorHandler} />
            <label>
                <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
                {renderComponent === 'Header' ? <></> : <span className={s.iconPhoto}></span>}
            </label>
        </div>
    )
}