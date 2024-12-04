import {
    createNavigationContainerRef,
    CommonActions,
} from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

export const navigate = (nextRoute, params) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(nextRoute, params || null))
        
        // navigationRef.dispatch((state) => {
        //     // Remove all the screens after `Profile`
        //     // const index = state.routes.findIndex((r) => r.name === 'Profile');
        //     // const routes = state.routes.slice(0, index + 1);
          
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