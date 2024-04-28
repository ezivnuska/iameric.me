import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    ContactView,
    ModalImage,
    PopUpModal,
    CenterVertical,
} from '.'
import {
    useApp,
    useContacts,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { closeContactModal, contactModals } = useContacts()

    const modal = useMemo(() => contactModals[contactModals.length - 1], [contactModals])

    const resolveModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'CONTACT': return <ContactView user={data} />; break
            case 'IMAGE': return <ModalImage image={data} />; break
            default: return null
        }
    }

    const handleClose = () => {
        closeContactModal()
    }

    return (
        <PopUpModal
            isVisible={contactModals.length > 0}
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