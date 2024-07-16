import { createNavigationContainerRef } from '@react-navigation/native'

export default navigationRef = createNavigationContainerRef()

export const navigate = async (nextRoute, params) => {
    console.log('nextRoute', nextRoute)
    console.log('params', params)
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