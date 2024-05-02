import React, { useMemo } from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    ContactView,
    FeedbackForm,
    DestroyForm,
    LocationForm,
    ModalImage,
    ModalProfile,
    ModalSignout,
    ImageSelector,
    PopUpModal,
    ProductDetails,
    ProductForm,
    SignInForm,
    SignUpForm,
    CenterVertical,
} from '.'
import {
    useApp,
    useContacts,
    useForm,
    useModal,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { closeModal, modals } = useModal()
    const { clearForm } = useForm()
    // const { contact, setContact } = useContacts()

    const modal = useMemo(() => modals[modals.length - 1], [modals])

    const renderModalContent = () => {
        if (!modal) return null
        const { type, data } = modal
        switch(type) {
            case 'CART': return <Cart />; break
            case 'CONTACT': return <ContactView user={data} />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage image={data} />; break
            case 'LOCATION': return <LocationForm location={data} />; break
            case 'PRODUCT': return <ProductForm />; break
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
        // if (contact && modals.length === 1) setContact(null)
        clearForm()
        closeModal(null)
    }

    return (
        <PopUpModal
            isVisible={modals.length > 0}
            onRequestClose={handleClose}
            transparent={true}
        >
            <View
                style={{
                    height: '100%',
                    minHeight: dims.height,
                    minWidth: dims.width,
                }}
            >
                <CenterVertical>
                    {renderModalContent()}
                </CenterVertical>
            </View>
        </PopUpModal>
    )
}