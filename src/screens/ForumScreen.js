import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    Forum,
    Screen,
    SimpleButton,
} from '@components'
import { ForumContextProvider } from '@forum'

export default props => {

    return (
        <Screen
            {...props}
            title='Forum'
        >
            <ForumContextProvider>
                <View
                    style={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        gap: 20,
                    }}
                >
                    <View style={{ flexGrow: 1 }}>
                        <Forum />
                    </View>

                    <View style={{ flexGrow: 0 }}>
                        <SimpleButton
                            label='Go Back'
                            onPress={() => props.navigation.navigate('Home')}
                        />
                    </View>
                </View>
            </ForumContextProvider>
        </Screen>
    )
}