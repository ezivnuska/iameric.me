import { createNavigationContainerRef } from '@react-navigation/native'

const navigationRef = createNavigationContainerRef()

export default navigationRef

export const navigate = async (nextRoute, params) => {
    console.log('navigating', navigationRef)
    if (navigationRef.isReady()) {
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
    }
}