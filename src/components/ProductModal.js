import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    ProductForm,
    PopUpModal,
    CenterVertical,
} from '.'
import {
    useApp,
    useForm,
    useProducts,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { clearForm } = useForm()
    const { closeProductModal, productModals } = useProducts()

    const modal = useMemo(() => productModals[productModals.length - 1], [productModals])

    const resolveModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'PRODUCT': return <ProductForm product={data} />; break
            default: return null
        }
    }

    const handleClose = () => {
        clearForm()
        closeProductModal()
    }

    return (
        <PopUpModal
            isVisible={productModals.length > 0}
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