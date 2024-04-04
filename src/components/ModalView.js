import React from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    Cart,
    FeedbackForm,
    FormSignIn,
    FormSignUp,
    // ModalCart,
    ModalDestroy,
    ModalImage,
    ModalLocation,
    ModalProfile,
    ModalSignout,
    ModalImageSelector,
    PopUpModal,
    ProductDetails,
    ProductForm,
} from '.'
import {
    useModal,
} from '@context'

export default () => {

    const dims = useWindowDimensions()
    const { closeModal, data, type } = useModal()

    const resolveModalContent = () => {
        switch(type) {
            case 'CART': return <Cart />; break
            case 'DESTROY': return <ModalDestroy />; break
            // case 'SHOW_PRODUCT': return <ProductDetails id={id} />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage id={data.id} />; break
            case 'LOCATION': return <ModalLocation />; break
            case 'PRODUCT': return <ProductForm product={data.product} />; break
            case 'PROFILE': return <ModalProfile />; break
            case 'SELECT_IMAGE': return <ModalImageSelector />; break
            case 'SIGNIN': return <FormSignIn />; break
            // case 'SIGNIN': return <SignInForm />; break
            case 'SIGNOUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <FormSignUp role='customer' />; break
            case 'SIGNUP_VENDOR': return <FormSignUp role='vendor' />; break
            case 'SIGNUP_DRIVER': return <FormSignUp role='driver' />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            isVisible={type !== null}
            onRequestClose={() => closeModal()}
            transparent={true}
        >
            <View
                style={{
                    // flex: 1,
                    flexBasis: 'auto',
                    // flexGrow: 1,
                    width: '100%',
                    height: dims.height,
                    borderWidth: 1,
                    borderStyle: 'dotted',
                    borderColor: 'white',
                }}
            >
                {resolveModalContent()}
            </View>
        </PopUpModal>
    )
}