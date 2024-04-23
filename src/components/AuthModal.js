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
    useAuth,
    useContacts,
    useForm,
    useModal,
    FormContextProvider,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { authModal, setAuthModal } = useAuth()
    // const { closeModal, modals } = useModal()
    const { clearForm } = useForm()
    const { contact, setContact } = useContacts()

    // const modal = useMemo(() => modals[modals.length - 1], [modals])

    const resolveModalContent = () => {
        switch(authModal) {
            case 'SIGN_IN': return <SignInForm />; break
            case 'SIGN_OUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <SignUpForm role='customer' />; break
            case 'SIGNUP_VENDOR': return <SignUpForm role='vendor' />; break
            case 'SIGNUP_DRIVER': return <SignUpForm role='driver' />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            isVisible={authModal !== null}
            onRequestClose={() => {
                clearForm()
                setAuthModal(null)
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