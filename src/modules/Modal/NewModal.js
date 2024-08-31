import React from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import Modal from 'react-native-modal'
import { useApp } from '@app'

export default ({ children, onRequestClose, ...props }) => {
    
    const { dims, theme } = useApp()

    const renderScrollView = () => (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
                // width: dims.width,
                // height: dims.height,
                background: theme?.colors.modalBackground,
            }}
            contentContainerStyle={{
                flex: 1,
                width: '100%',
                maxWidth: 400,
                marginHorizontal: 'auto',
                // padding: 10,
            }}
        >
            {children}
        </ScrollView>
    )

    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                margin: 0,
                position: 'relative',
            }}
        >
            <Pressable
                onPress={onRequestClose}
                style={{
                    // flex: 1,
                    // flexGrow: 1,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            />

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    flexShrink: 1,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    maxHeight: dims.height - 50,
                    width: dims.width,
                    maxWidth: 400,
                    marginHorizontal: 'auto',
                }}
            >
                {renderScrollView()}
            </View>
        </Modal>
    )
}