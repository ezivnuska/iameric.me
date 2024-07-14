import React from 'react'
import {
    AuthForm,
    DestroyForm,
    FeedbackForm,
    ImageForm,
    MessageForm,
    SettingsForm,
} from '@forms'
import { useForm } from '@form'
import { useModal } from '@modal'
import {
    ImageDisplay,
    ModalContainer,
} from './components'

export default () => {

    const { closeModal, modal, modals } = useModal()
    const { clearForm } = useForm()

    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'SHOWCASE': return <ImageDisplay image={data} />; break
            case 'AUTH': return <AuthForm />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ImageForm />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            case 'SETTINGS': return <SettingsForm />; break
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