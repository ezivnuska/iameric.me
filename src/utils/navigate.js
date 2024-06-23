import { createNavigationContainerRef } from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

const navigate = async (nextRoute, params) => {
    if (navigationRef.isReady()) {
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
    }
}

export {
    navigationRef,
    navigate,
}