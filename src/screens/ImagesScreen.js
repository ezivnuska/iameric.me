import React from 'react'
import { Screen } from '.'
import { ImagesView } from '@components'
import { ImageContextProvider } from '@context'

export default props => (
    <Screen {...props}>
        <ImageContextProvider>
            <ImagesView />
        </ImageContextProvider>
    </Screen>
)