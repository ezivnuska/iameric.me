import { useContext, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { AppContext } from '@context'

export const useKeyboard = () => {

    const {
        dispatch,
    } = useContext(AppContext)
    
    useEffect(() => {
        const onKeyboardDidShow = e => {
            alert('keyboard did show')
            dispatch({ type: 'SET_KEYBOARD_STATUS', visible: true})
        }
        const onKeyboardWillHide = () => {
            alert('keyboard will hide')
            dispatch({ type: 'SET_KEYBOARD_STATUS', visible: false})
        }

        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
        const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])
}