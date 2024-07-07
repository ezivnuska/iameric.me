import React, { useMemo } from 'react'
import {
    AuthForm,
    DestroyForm,
    useForm,
} from '@forms'
import { useModal } from '@modal'
import { ModalContainer } from './components'

export default () => {

    const { closeModal, modals } = useModal()
    const { clearForm } = useForm()

    const modal = useMemo(() => modals[modals.length - 1], [modals])

    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'AUTH': return <AuthForm />; break
            case 'DESTROY': return <DestroyForm />; break
            default: return null
        }
    }
    
    const handleClose = () => {
        clearForm()
        closeModal(null)
    }
    
    return (
        <ModalContainer
            isVisible={modals.length > 0}
            onRequestClose={handleClose}
        >
            {renderModalContent()}
        </ModalContainer>
    )
}