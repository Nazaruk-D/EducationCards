import { AxiosResponse } from 'axios'
import { instance } from './instance'

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post<RegistrationPayloadType, AxiosResponse<UserData>>(`auth/register`, { email, password })
    },
    me() {
        return instance.post<UserData>(`auth/me`)
    },
    changeNameOrImg(data: ChangeNameOrImgType) {
        return instance.put<UserData>('auth/me', data)
    },
    login(data: LoginParamsData) {
        return instance.post<LoginParamsData, AxiosResponse<UserData>>('auth/login', data).then((response) => response.data)
    },
    logout() {
        return instance.delete<AxiosResponse<LogoutResponseType>>(`auth/me`)
    },
}

export const forgotPasswordAPI = {
    forgotPassword(dataForgotPassword: ForgotPasswordDataType) {
        return instance.post<ResponseForgotPasswordAPIType>('auth/forgot', dataForgotPassword)
    },
    sendNewPassword(dataNewPassword: DataNewPasswordType) {
        return instance.post<ResponseForgotPasswordAPIType>('auth/set-new-password', dataNewPassword)
    },
}

// userAPI types
export type ChangeNameOrImgType = {
    name?: string
    avatar?: string
}
export type ResponseForgotPasswordAPIType = {
    info: string
    error: string
}
export type DataNewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}
export type ForgotPasswordDataType = {
    email: string
    from: string
    message: string
}
export type RegistrationPayloadType = {
    email: string
    password: string
}
export type LoginParamsData = {
    email: string
    password: string
    rememberMe: boolean
}
export type UserData = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
export type LogoutResponseType = {
    info: string
    error: string
}
