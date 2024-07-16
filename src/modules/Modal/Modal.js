import React from 'react'
import {
    AuthForm,
    CaptionForm,
    DestroyForm,
    FeedbackForm,
    ImageForm,
    MessageForm,
    SettingsForm,
} from '@forms'
import { useModal } from '@modal'
import {
    ImageDisplay,
    ModalContainer,
    SocketDisplay,
} from './components'

export default () => {

    const { closeModal, modal, modals } = useModal()
    
    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'CAPTION': return <CaptionForm data={data} />; break
            case 'SHOWCASE': return <ImageDisplay image={data} />; break
            case 'AUTH': return <AuthForm />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ImageForm />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            case 'SETTINGS': return <SettingsForm />; break
            case 'SOCKETS': return <SocketDisplay />; break
            default: return null
        }
    }
    
    return (
        <ModalContainer
            isVisible={modals.length > 0}
            onRequestClose={closeModal}
        >
            {renderModalContent()}
        </ModalContainer>
    )
}