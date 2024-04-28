import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    ModalSignout,
    PopUpModal,
    SignInForm,
    SignUpForm,
    CenterVertical,
} from '.'
import {
    useApp,
    useForm,
} from '@context'

export default () => {

    const { appModals, dims, closeAppModal } = useApp()
    const { clearForm } = useForm()

    const modal = useMemo(() => appModals[appModals.length - 1], [appModals])

    const resolveModalContent = () => {
        if (!modal) return null
        switch(modal.type) {
            case 'SIGN_IN': return <SignInForm />; break
            case 'SIGN_OUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <SignUpForm role='customer' />; break
            case 'SIGNUP_VENDOR': return <SignUpForm role='vendor' />; break
            case 'SIGNUP_DRIVER': return <SignUpForm role='driver' />; break
            default: return null
        }
    }

    const handleClose = () => {
        clearForm()
        closeAppModal(null)
    }

    return (
        <PopUpModal
            isVisible={appModals.length > 0}
            onRequestClose={handleClose}
            transparent={true}
        >
            <View
                style={{
                    height: '100%',
                    minHeight: dims.height,
                }}
            >
                <CenterVertical>
                    {resolveModalContent()}
                </CenterVertical>
            </View>
        </PopUpModal>
    )
}