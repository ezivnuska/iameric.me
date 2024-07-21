import { createNavigationContainerRef } from '@react-navigation/native'
import getCurrentRoute from './getCurrentRoute'
import navigate from './navigate'

export default navigationRef = createNavigationContainerRef()

export {
    getCurrentRoute,
    navigate,
}