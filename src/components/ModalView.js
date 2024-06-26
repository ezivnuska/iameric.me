import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    Contact,
    FeedbackForm,
    DestroyForm,
    ImageSelector,
    LocationForm,
    ModalDeleteImage,
    ModalDeleteProduct,
    ModalImage,
    ModalProfile,
    ModalSignout,
    Orders,
    PopUpModal,
    ProductDetails,
    ProductForm,
    SignInForm,
    SignUpForm,
} from '@components'
import {
    useApp,
    useForm,
    useModal,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { closeModal, modals } = useModal()
    const { clearForm } = useForm()

    const modal = useMemo(() => modals[modals.length - 1], [modals])

    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'CART': return <Cart />; break
            case 'CONTACT': return <Contact userId={data._id} />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'DELETE_PRODUCT': return <ModalDeleteProduct productId={data} />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage image={data} />; break
            case 'IMAGE_DELETE': return <ModalDeleteImage callback={data} />; break
            case 'LOCATION': return <LocationForm location={data} />; break
            case 'ORDERS': return <Orders />; break
            case 'PRODUCT': return <ProductForm product={data} />; break
            case 'PROFILE': return <ModalProfile image={data} />; break
            case 'SELECT_IMAGE': return <ImageSelector />; break
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
        closeModal(null)
    }

    return (
        <PopUpModal
            isVisible={modals.length > 0}
            onRequestClose={handleClose}
            transparent={true}
        >
            {renderModalContent()}
        </PopUpModal>
    )
}