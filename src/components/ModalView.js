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
    ModalImageSelector,
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
    const { contact, setContact } = useContacts()

    const modal = useMemo(() => modals[modals.length - 1], [modals])

    const resolveModalContent = () => {
        if (!modal) return null
        switch(modal.type) {
            case 'CART': return <Cart />; break
            case 'CONTACT': return <ContactView user={modal.data} />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={modal.data} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage image={modal.data} />; break
            case 'LOCATION': return <LocationForm />; break
            case 'PRODUCT': return <ProductForm />; break
            case 'PROFILE': return <ModalProfile />; break
            case 'SELECT_IMAGE': return <ModalImageSelector />; break
            case 'SIGNIN': return <SignInForm />; break
            case 'SIGNOUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <SignUpForm role='customer' />; break
            case 'SIGNUP_VENDOR': return <SignUpForm role='vendor' />; break
            case 'SIGNUP_DRIVER': return <SignUpForm role='driver' />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            isVisible={modals.length > 0}
            onRequestClose={() => {
                if (contact && modals.length === 1) setContact(null)
                clearForm()
                closeModal()
            }}
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