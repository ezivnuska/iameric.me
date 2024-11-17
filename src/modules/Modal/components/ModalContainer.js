import React from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useApp } from '@app'
import { View } from 'react-native'

export default ({ children, onRequestClose, fullscreen = false, transparent = false, ...props }) => {
    
    const { dims, theme } = useApp()

    const renderScrollView = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
                width: dims.width,
                height: dims.height,
                background: theme?.colors.modalBackground,
            }}
            contentContainerStyle={{
                flex: 1,
                width: '100%',
                maxWidth: 375,
                marginHorizontal: 'auto',
                padding: 10,
            }}
        >
            {children}
        </ScrollView>
    )

    const renderChildren = () => fullscreen
        ? (
            <View
                style={{
                    flex: 1,
                    width: dims.width,
                    height: dims.height,
                    background: theme?.colors.modalBackground,
                }}
            >
                {children}
            </View>
        )
        : renderScrollView()

    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
            style={{ margin: 0 }}
        >
            {renderChildren()}
        </Modal>
    )
}