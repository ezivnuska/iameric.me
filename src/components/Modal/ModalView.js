import React, { useMemo } from 'react'
import { View } from 'react-native'
import {
    DestroyForm,
    // SignInForm,
    // SignUpForm,
} from '@components/Form/forms'
import { AuthView } from '@components'
import { useForm } from '@components/Form/FormContext'
import { useModal } from './ModalContext'
import { PopUpModal } from './components'

export default ModalView = () => {

    const { closeModal, modals } = useModal()
    const { clearForm } = useForm()

    const modal = useMemo(() => modals[modals.length - 1], [modals])

    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'DESTROY': return <DestroyForm />; break
            case 'AUTH': return <AuthView />; break
            // case 'SIGN_OUT': return <ModalSignout />; break
            // case 'SIGNUP': return <SignUpForm />; break
            default: return null
        }
    }
    
    const handleClose = () => {
        clearForm()
        closeModal(null)
    }

    return (
        <PopUpModal
            isVisible={modals.length > 0}
            onRequestClose={closeModal}
        >
            {renderModalContent()}
        </PopUpModal>
    )
}