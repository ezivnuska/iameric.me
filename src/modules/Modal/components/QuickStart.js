import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { useModal } from '@modal'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCarBurst } from '@fortawesome/free-solid-svg-icons/faCarBurst'

export default () => {
    const { closeModal, setNewModal } = useModal()
    return (
        <View
            style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <Pressable
                    onPress={() => setNewModal('CAPTURE')}
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'tomato',
                        height: 40,
                        borderRadius: 14,
                        overflow: 'hidden',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCarBurst}
                        size={30}
                        color='#fff'
                    />

                    <ThemedText
                        color='#fff'
                        size={20}
                        bold
                    >
                        Capture Bip!
                    </ThemedText>
                </Pressable>
            </View>

        </View>
    )
}