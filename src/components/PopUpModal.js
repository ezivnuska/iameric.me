import React, { useContext } from 'react'
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
import { AppContext } from '../AppContext'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    const {
        isLandscape,
    } = useContext(AppContext)

    return (
        <Modal
            {...props}
            animationType='fade'
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <View
                style={{
                    width: dims.width,
                    maxWidth: dims.width,//isLandscape ? dims.width : 600,
                    height: dims.height,
                    marginHorizontal: 'auto',
                    backgroundColor: theme?.colors.modalBackground,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
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
                            width: '100%',
                            minWidth: 280,
                            maxWidth: isLandscape ? '100%' : 580,
                            marginHorizontal: 'auto',
                            textAlign: 'center',
                            height: dims.height,
                        }}
                        contentContainerStyle={{
                            width: '100%',
                            minWidth: 280,
                            maxWidth: isLandscape ? '100%' : 600,
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            marginHorizontal: 'auto',
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