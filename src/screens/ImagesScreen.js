import React from 'react'
import { View } from 'react-native'
import { Screen } from './components'
import Images, {
    ImagesContextProvider,
} from '@images'

const ImagesScreen = props => (
    <Screen secure {...props}>

        <View style={{ flex: 1 }}>

            <ImagesContextProvider>
                <Images {...props} />
            </ImagesContextProvider>

        </View>

    </Screen>
)

export default ImagesScreen