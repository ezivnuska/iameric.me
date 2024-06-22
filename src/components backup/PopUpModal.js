import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { IconButton } from '.'
import { useApp } from '@context'
import Modal from 'react-native-modal'
import { classes } from '@styles'

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
                style={[classes.screen, {
                    position: 'relative',
                    width: dims.width,
                    height: dims.height,
                }]}
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
                        fontSize: 22,
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        height: dims.height,
                        background: theme?.colors.modalBackground,
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {children}
                </ScrollView>
            </View>
            
        </Modal>
    )
}