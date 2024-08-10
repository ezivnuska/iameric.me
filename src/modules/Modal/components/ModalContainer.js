import React from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useApp } from '@app'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const { dims, theme } = useApp()
    
    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
            style={{ flex: 1 }}
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    // width: dims.width,
                    height: dims.height,
                    background: theme?.colors.modalBackground,
                }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    maxWidth: 400,
                    marginHorizontal: 'auto',
                    // padding: 10,
                    // borderWidth: 1,
                }}
            >
                {children}
            </ScrollView>
            
        </Modal>
    )
}