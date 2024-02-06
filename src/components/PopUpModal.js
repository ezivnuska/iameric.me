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
                        backgroundColor: theme?.colors.background,
                        opacity: 0.9,
                    }}
                    onPress={onRequestClose}
                />

                <View
                    style={{
                        width: 360,
                        minWidth: 360,
                        maxWidth: 360,
                        maxHeight: '90%',
                        paddingHorizontal: 10,
                        marginHorizontal: 'auto',
                        backgroundColor: transparent ? 'transparent' : theme?.colors.screen,
                        borderRadius: 12,
                        borderWidth: transparent ? 0 : 1,
                        borderColor: transparent ? 'transparent' : theme?.colors.border,
                        flexBasis: 'auto',
                    }}
                >
                    <ScrollView
                        style={{
                            width: '100%',
                            paddingVertical: 10,
                            // backgroundColor: '#f00',
                        }}
                    >
                        {children}

                        <IconButton
                            label='Cancel'
                            onPress={onRequestClose}
                            // iconName='close-outline'
                            style={{ marginTop: 10 }}
                            transparent
                        />
                    </ScrollView>
                </View>
                
            </View>

        </Modal>
    )
}