import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    CenterVertical,
    DestroyForm,
    ImageSelector,
    LocationForm,
    ModalImage,
    PopUpModal,
    ProductDetails,
    ProductForm,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { closeUserModal, userModals } = useUser()

    const modal = useMemo(() => userModals[userModals.length - 1], [userModals])

    const resolveModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'DESTROY': return <DestroyForm />; break
            case 'IMAGE': return <ModalImage image={data} />; break
            case 'LOCATION': return <LocationForm location={data} />; break
            case 'PRODUCT': return <ProductForm />; break
            case 'SELECT_IMAGE': return <ImageSelector />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data} />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            isVisible={userModals.length > 0}
            onRequestClose={closeUserModal}
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