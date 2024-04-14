import React from 'react'
import {
    View,
} from 'react-native'
import {
    Cart,
    FeedbackForm,
    DestroyForm,
    ModalImage,
    ModalLocation,
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
    useForm,
    useModal,
} from '@context'

export default () => {

    const { dims } = useApp()
    const { closeModal, data, type } = useModal()
    const { clearForm } = useForm()

    const resolveModalContent = () => {
        switch(type) {
            case 'CART': return <Cart />; break
            case 'DESTROY': return <DestroyForm />; break
            // case 'SHOW_PRODUCT': return <ProductDetails id={id} />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage id={data.id} />; break
            case 'LOCATION': return <ModalLocation />; break
            case 'PRODUCT': return <ProductForm />; break
            case 'PROFILE': return <ModalProfile />; break
            case 'SELECT_IMAGE': return <ModalImageSelector />; break
            case 'SIGNIN': return <SignInForm />; break
            // case 'SIGNIN': return <FormSignIn />; break
            // case 'SIGNIN': return <SignInForm />; break
            case 'SIGNOUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <SignUpForm role='customer' />; break
            case 'SIGNUP_VENDOR': return <SignUpForm role='vendor' />; break
            case 'SIGNUP_DRIVER': return <SignUpForm role='driver' />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            isVisible={type !== null}
            onRequestClose={() => {
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