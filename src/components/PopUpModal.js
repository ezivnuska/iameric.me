import React from 'react'
import {
    Modal,
    useWindowDimensions,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { useTheme } from 'react-native-paper'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <View
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme?.colors.modalBackground,
                }}
            >

                <IconButton
                    iconName='close-outline'
                    onPress={onRequestClose}
                    transparent
                    style={{
                        position: 'absolute',
                        top: 9,
                        right: 5,
                        zIndex: 100,
                    }}
                    textStyles={{
                        color: theme?.colors.textDefault,
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        minWidth: 300,
                        maxWidth: 400,
                        marginHorizontal: 'auto',
                        textAlign: 'center',
                        height: dims.height,
                    }}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 'auto',
                        minHeight: dims.height,
                    }}
                >
                    {children}
                </ScrollView>
                
            </View>

        </Modal>
    )
}