import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    // Keyboard,
    // KeyboardAvoidingView,
    // Modal,
    ScrollView,
    // TouchableWithoutFeedback,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    IconButton,
    // ThemedText,
} from '.'
// import { useTheme } from 'react-native-paper'
import { AppContext, useApp } from '@context'
import Modal from 'react-native-modal'

export default ({ children, onRequestClose, transparent = false, ...props }) => {
    
    const { theme } = useApp()

    const dims = useWindowDimensions()

    // const [metrics, setMetrics] = useState(undefined)

    const {
        dispatch,
        isLandscape,
        // keyboard,
    } = useContext(AppContext)

    // useEffect(() => {
    //     alert('keyboard changed', keyboard)
    // }, [keyboard])

    // useEffect(() => {
    //     const onKeyboardDidShow = e => {
    //         // alert('keyboard did show', e.target)
    //         dispatch({ type: 'SET_KEYBOARD_STATUS', visible: true})
    //         console.log('Keyboard.metrics', Keyboard.metrics)
    //     }
    //     const onKeyboardWillHide = e => {
    //         // alert('keyboard will hide', e.target)
    //         dispatch({ type: 'SET_KEYBOARD_STATUS', visible: false})
    //     }

    //     const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    //     const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)

    //     return () => {
    //         showSubscription.remove()
    //         hideSubscription.remove()
    //     }
    // }, [])

    // const keyboardMetrics = useMemo(() => Keyboard.metrics, [Keyboard])
    
    // const getKeyboardMetrics = () => {
    //     if (Keyboard.metrics) {
    //         const keyboardMetrics = Keyboard.metrics
    //         setMetrics(keyboardMetrics)
    //     }
    // }
    
    // useEffect(() => {
    //     const onKeyboardDidShow = e => {
    //         console.log('e.endCoordinates.height', e.endCoordinates.height)
    //         getKeyboardMetrics()
    //     }
    //     const onKeyboardDidHide = e => getKeyboardMetrics()

    //     const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    //     const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)

    //     return () => {
    //         showSubscription.remove()
    //         hideSubscription.remove()
    //     }
    // }, [])

    // useEffect(() => {
    //     getKeyboardMetrics()
    // }, [])

    // useEffect(() => {
    //     alert('metrics', metrics)
    // }, [metrics])
    
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
                    // flex: 1,
                    position: 'relative',
                    width: dims.width,
                    height: dims.height,
                    // height: keyboardHeight ? dims.height - keyboardHeight : dims.height,
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
                        // flex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        // width: dims.width,
                        // height: dims.height,
                        // minWidth: 280,
                        // maxWidth: isLandscape ? '100%' : 580,
                        // marginHorizontal: 'auto',
                        // textAlign: 'center',
                        // height: dims.height,
                        // marginHorizontal: 'auto',
                        background: theme?.colors.modalBackground,
                    }}
                    contentContainerStyle={{
                        width: '100%',
                        minWidth: 280,
                        maxWidth: isLandscape ? '100%' : 600,
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // marginHorizontal: 'auto',
                        // height: '100%',
                        // height: dims.height,
                        // height: keyboardHeight ? dims.height - keyboardHeight : dims.height,
                    }}
                >
                    {children}
                </ScrollView>
            
            </View>

        </Modal>
    )
}