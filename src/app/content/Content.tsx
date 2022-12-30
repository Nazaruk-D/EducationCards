import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../routes/Routes'
import Profile from '../../features/profile/Profile'
import Registration from '../../features/auth/registration/Registration'
import { NewPassword } from '../../features/auth/forgotPassword/NewPassword'
import { PasswordRecovery } from '../../features/auth/forgotPassword/PasswordRecovery'
import s from './Content.module.css'
import { ForgotPassword } from '../../features/auth/forgotPassword/ForgotPassword'
import { Login } from '../../features/auth/login/Login'
import { PackList } from '../../features/cards/PackList/PackList'
import { CardsList } from '../../features/cards/CardsList/CardsList'
import { LearnPage } from '../../features/cards/LearnPage/LearnPage'
import { WithoutCards } from '../../features/cards/WithoutCards/WithoutCards'

const Content = () => {
    return (
        <div className={s.contentBlock}>
            <Routes>
                <Route path={'/'} element={<Profile />} />
                <Route path={routes.packsList} element={<PackList />} />
                <Route path={routes.learnPack} element={<LearnPage />} />
                <Route path={routes.myPacksList} element={<CardsList />} />
                <Route path={routes.profile} element={<Profile />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.registration} element={<Registration />} />
                <Route path={routes.forgotPassword} element={<ForgotPassword />} />
                <Route path={routes.newPassword} element={<NewPassword />} />
                <Route path={`${routes.newPassword}/:token`} element={<NewPassword />} />
                <Route path={routes.passwordRecovery} element={<PasswordRecovery />} />
                <Route path={routes.withoutCards} element={<WithoutCards />} />
                {/*<Route path={routes.error404} element={<Error404 />} />*/}
                {/*<Route path={'/*'} element={<Navigate to={routes.error404} />} />*/}
            </Routes>
        </div>
    )
}

export default Content
