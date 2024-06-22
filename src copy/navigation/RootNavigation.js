import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = async (nextRoute, params) => {
    if (navigationRef.isReady()) {
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
    }
}