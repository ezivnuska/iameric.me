import {
    createNavigationContainerRef,
    CommonActions,
} from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

export const navigate = (nextRoute, params) => {
    if (navigationRef.isReady()) {
        if (params) navigationRef.dispatch(CommonActions.navigate(nextRoute, params))
        else navigationRef.dispatch(CommonActions.navigate(nextRoute))
    }
}

export const getCurrentRoute = () => {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute()
    }
}

export default navigationRef