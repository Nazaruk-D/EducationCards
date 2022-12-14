import { GetPackParams } from '../../../../api/packsAPI'

const initialStateSetting = {
    user_id: '',
    packName: '',
    min: 0,
    max: 110,
    sortPacks: '',
    page: 1,
    pageCount: 8,
    block: false,
}

export type InitialStateSettingType = typeof initialStateSetting

export const settingReducer = (
    state: InitialStateSettingType = initialStateSetting,
    action: SettingActionsType
): InitialStateSettingType => {
    switch (action.type) {
        case 'SETTING/SET-DATA': {
            if (Object.keys(action.setting).length === 0) {
                return { user_id: '', packName: '', min: 0, max: 110, sortPacks: '', page: 0, pageCount: 8, block: false }
            }
            return { ...state, ...action.setting }
        }
        case 'SETTING/RESET-DATA': {
            return { user_id: '', packName: '', min: 0, max: 110, sortPacks: '', page: 0, pageCount: 8, block: false }
        }
        case 'SETTING/SET-PACK-NAME': {
            return { ...state, packName: action.packName }
        }
        default:
            return state
    }
}

//Action creators

export const setSetting = (setting: GetPackParams) => ({ type: 'SETTING/SET-DATA', setting } as const)
export const resetSetting = () => ({ type: 'SETTING/RESET-DATA' } as const)
export const setPackName = (packName: string) => ({ type: 'SETTING/SET-PACK-NAME', packName } as const)

//Types
export type SettingActionsType = ReturnType<typeof setSetting> | ReturnType<typeof resetSetting> | ReturnType<typeof setPackName>
