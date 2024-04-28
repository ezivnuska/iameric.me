import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    FeedbackForm,
    PopUpModal,
    CenterVertical,
} from '.'
import {
    useApp,
    useForm,
    useForum,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { clearForm } = useForm()
    const { closeForumModal, forumModals } = useForum()

    const modal = useMemo(() => forumModals[forumModals.length - 1], [forumModals])

    const resolveModalContent = () => {
        if (!modal) return null
        switch(modal.type) {
            case 'FEEDBACK': return <FeedbackForm />; break
            default: return null
        }
    }

    const handleClose = () => {
        clearForm()
        closeForumModal()
    }

    return (
        <PopUpModal
            isVisible={forumModals.length > 0}
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