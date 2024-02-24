import React from 'react'
import {
    Modal,
    Pressable,
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
                    height: '100%',
                    textAlign: 'center',
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
                    // outline
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'transparent',
                        zIndex: 100,
                    }}
                    textStyles={{
                        color: theme?.colors.textAlt,
                    }}
                />

                <View
                    style={{
                        position: 'relative',
                        height: dims.height,
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 400,
                        marginHorizontal: 'auto',
                        overflow: 'visible',
                        // backgroundColor: 'transparent',
                        // backgroundColor: transparent ? 'rgba(255, 255, 255, 0)' : theme?.colors.screen,
                        // borderWidth: transparent ? 0 : 1,
                        // borderColor: transparent ? 'rgba(255, 255, 255, 0)' : theme?.colors.border,
                        // flexBasis: 'auto',
                        // backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        // borderWidth: 1,
                        // borderColor: 'red',
                        // flexGrow: 1,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            paddingHorizontal: 'auto',
                            textAlign: 'center',
                            height: dims.height,
                        }}
                    >
                        {children}
                    </ScrollView>
                </View>
                
            </View>

        </Modal>
    )
}