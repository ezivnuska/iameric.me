import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { useApp } from '@context'
import Modal from 'react-native-modal'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const { dims, landscape, theme } = useApp()
    
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

                <IconButton
                    iconName='close-outline'
                    onPress={onRequestClose}
                    transparent
                    style={{
                        flexBasis: 'auto',
                        position: 'absolute',
                        top: 9,
                        right: 5,
                        zIndex: 100,
                    }}
                    textStyles={{
                        color: theme?.colors.textDefault,
                        fontSize: 22,
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        background: theme?.colors.modalBackground,
                    }}
                    contentContainerStyle={{
                        width: '100%',
                        minWidth: 280,
                        maxWidth: landscape ? '100%' : 600,
                    }}
                >
                    {children}
                </ScrollView>
            
            </View>

        </Modal>
    )
}