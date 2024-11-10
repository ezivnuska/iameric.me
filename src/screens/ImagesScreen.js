import React from 'react'
import { Screen } from './components'
import Images, { ImagesContextProvider } from '@images'

const ImagesScreen = props => (
    <Screen secure {...props}>
        <ImagesContextProvider>
            <Images {...props} />
        </ImagesContextProvider>
    </Screen>
)

export default ImagesScreen