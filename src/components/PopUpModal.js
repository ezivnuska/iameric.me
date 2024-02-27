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
                    width: '100%',
                    height: dims.height,
                    backgroundColor: theme?.colors.modalBackground,
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 600,
                        minWidth: 280,
                        height: dims.height,
                        marginHorizontal: 'auto',
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
                        // outline
                        // padded={false}
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
                
            </View>

        </Modal>
    )
}