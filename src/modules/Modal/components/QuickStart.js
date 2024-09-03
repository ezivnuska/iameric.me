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
                    gap: 8,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // height: 40,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCarBurst}
                        size={30}
                        color='tomato'
                        style={{
                            transform: [{
                                rotate: '-15deg',
                            }],
                        }}
                    />

                    <ThemedText
                        color='tomato'
                        size={20}
                        bold
                    >
                        Capture Bip!
                    </ThemedText>
                </View>

                <SimpleButton
                    label='Open Camera'
                    onPress={() => setNewModal('CAPTURE')}
                />

                <SimpleButton
                    label='Continue to Bipsy'
                    color='#666'
                    onPress={() => closeModal()}
                    transparent
                />
            </View>

        </View>
    )
}