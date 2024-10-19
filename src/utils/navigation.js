import { createNavigationContainerRef } from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

export const navigate = async (nextRoute, params) => {
    if (navigationRef.isReady()) {
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
    }
}

export const getCurrentRoute = async () => {
    if (navigationRef.isReady()) {
        const route = await navigationRef.getCurrentRoute()
        return route
    }
}

export default navigationRef