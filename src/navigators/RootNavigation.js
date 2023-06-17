import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = async (name, params) => {
    if (navigationRef.isReady()) {
        // do something...
        navigationRef.navigate(name)
    }
}