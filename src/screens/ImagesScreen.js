import React, { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import {
    IconButton,
    Screen,
    ThemedText,
} from '@components'
import { Images } from '@modules'
import { useApp } from '@app'

export default props => {

    const { user } = useApp()

    const username = useMemo(() => props.route.params?.username || user.username, [props])
    
    return (
        <Screen {...props}>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 10,
                    }}
                >
                    <Pressable
                        onPress={() => props.navigation.navigate('Profile')}
                        disabled={props.route.name === 'Profile'}
                        style={{ flexGrow: 0 }}
                    >
                        <ThemedText bold size={18}>
                            {username}
                        </ThemedText>
                    </Pressable>

                    <View style={{ flexGrow: 1 }}>
                        <IconButton
                            name='images-outline'
                            onPress={() => props.navigation.goBack()}
                            disabled={props.route.name === 'Images'}
                        />
                    </View>
                </View>
                    
                <View style={{ flexGrow: 1 }}>
                    <Images />
                </View>

            </View>

        </Screen>
    )
}