import React from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    // SimpleButton,
    ThemedText,
} from '@components'
import { useApp } from '@app'
import Modal from 'react-native-modal'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const { dims, theme } = useApp()
    
    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
            style={{ margin: 0 }}
        >
            
            <View
                style={{
                    position: 'relative',
                    width: dims.width,
                    height: dims.height,
                }}
            >

                <Pressable
                    onPress={onRequestClose}
                    style={{
                        position: 'absolute',
                        top: 9,
                        right: 5,
                        zIndex: 100,
                    }}
                >
                    <ThemedText>X</ThemedText>
                </Pressable>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        height: dims.height,
                        background: theme?.colors.modalBackground,
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        width: '100%',
                        maxWidth: 400,
                        marginHorizontal: 'auto',
                    }}
                >
                    {children}
                </ScrollView>
            </View>
            
        </Modal>
    )
}