import {
    createNavigationContainerRef,
    CommonActions,
} from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

export const navigate = (nextRoute, params) => {
    // console.log('nextRoute', nextRoute)
    // console.log('params', params)
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(nextRoute, params))
        
        // navigationRef.dispatch((state) => {
        //     return CommonActions.reset({
        //         ...state,
        //         index: 0,
        //     })
        // })
    }
}

export const getCurrentRoute = () => {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute()
    }
}

export default navigationRef