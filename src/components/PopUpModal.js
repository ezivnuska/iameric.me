import React from 'react'
import {
    Modal,
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
} from '.'
import { useTheme } from 'react-native-paper'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const theme = useTheme()

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
                    height: '100%',

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >

                <Pressable
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: theme?.colors.modalBackground,
                        opacity: 0.9,
                    }}
                    onPress={onRequestClose}
                />

                <IconButton
                    iconName='close-outline'
                    onPress={onRequestClose}
                    transparent
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: theme?.colors.modalBackground,
                        zIndex: 100,
                    }}
                />

                <View
                    style={{
                        zIndex: 10,
                        // width: '100%',
                        // height: 'auto',
                        minWidth: 200,
                        maxWidth: 900,
                        maxHeight: '90%',
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        marginHorizontal: 'auto',
                        backgroundColor: transparent ? 'rgba(255, 255, 255, 0)' : theme?.colors.screen,
                        // borderRadius: 8,
                        borderWidth: transparent ? 0 : 1,
                        borderColor: transparent ? 'rgba(255, 255, 255, 0)' : theme?.colors.border,
                        flexBasis: 'auto',
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            // width: '100%',
                            // paddingVertical: 10,
                        }}
                    >
                        {children}
                    </ScrollView>
                </View>
                
            </View>

        </Modal>
    )
}