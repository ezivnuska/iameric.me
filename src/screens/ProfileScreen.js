import React, { useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    Screen,
    SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default props => {
    // console.log('check out available props from navigation container...', props)
    // we are using the navigate method below.

    const { theme, user } = useApp()
    const { setModal } = useModal()

    const [optionsVisible, setOptionsVisible] = useState(false)

    const renderHeader = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
            }}
        >
            <ThemedText bold size={20}>
                {user && user.username}
            </ThemedText>

            <Pressable
                onPress={() => setOptionsVisible(!optionsVisible)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <ThemedText size={16}>
                    {`${optionsVisible ? 'hide' : 'show'} options`}
                </ThemedText>

                <Icon
                    name={optionsVisible ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={theme?.colors.textDefault}
                />
            </Pressable>
        </View>
    )
    
    return (
        <Screen
            {...props}
            // title='Home'
        >
            <View
                style={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    gap: 20,
                }}
            >

                <View style={{ flexGrow: 1 }}>
                    
                    {renderHeader()}
                    
                    <View
                        style={{
                            display: optionsVisible ? 'flex' : 'none',
                            paddingVertical: 10,
                        }}
                    >
                        <SimpleButton
                            label='Close Account'
                            onPress={() => setModal('DESTROY')}
                        />
                    </View>

                </View>

                <View style={{ flexGrow: 0 }}>
                    <SimpleButton
                        label='Home'
                        onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </View>
            

        </Screen>
    )
}