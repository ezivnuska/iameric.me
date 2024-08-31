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
import { NewModal, useModal } from '@modal'
import {
    CameraView,
    ImageDisplay,
    ModalContainer,
    SocketDisplay,
    QuickStart,
} from './components'

export default () => {

    const { closeModal, modal, modals } = useModal()
    
    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'AUTH': return <AuthForm />; break
            case 'CAPTION': return <CaptionForm data={data} />; break
            case 'CAPTURE': return <CameraView />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'FEEDBACK': return <FeedbackForm data={data} />; break
            case 'IMAGE': return <ImageForm />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            case 'SETTINGS': return <SettingsForm />; break
            case 'SHOWCASE': return <ImageDisplay data={data} />; break
            case 'SOCKETS': return <SocketDisplay />; break
            case 'QUICK': return <QuickStart />; break
            default: return null
        }
    }
    
    return (
        <NewModal
            isVisible={modals.length > 0}
            onRequestClose={closeModal}
        >
            {renderModalContent()}
        </NewModal>
    )
    // (
    //     <ModalContainer
    //         isVisible={modals.length > 0}
    //         onRequestClose={closeModal}
    //         fullscreen={modal && modal.type === 'CAPTURE'}
    //     >
    //         {renderModalContent()}
    //     </ModalContainer>
    // )
}