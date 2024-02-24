import React from 'react'
import {
    View,
} from 'react-native'
import {
    FeedbackForm,
    ImageDetail,
    ModalCart,
    ModalDestroy,
    ModalFeatured,
    ModalProfile,
    ModalSignin,
    ModalSignup,
    ModalSignout,
    ModalImageSelector,
    ModalLocation,
    ProductForm,
    PopUpModal,
} from '.'

export default ({ name, close }) => {

    const resolveModalContent = () => {
        switch(name) {
            case 'CART': return <ModalCart />; break
            case 'DESTROY': return <ModalDestroy />; break
            case 'FEATURED': return <ModalFeatured />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ImageDetail />; break
            case 'LOCATION': return <ModalLocation />; break
            case 'PRODUCT': return <ProductForm />; break
            case 'PROFILE': return <ModalProfile />; break
            case 'SELECT_IMAGE': return <ModalImageSelector />; break
            case 'SIGNIN': return <ModalSignin />; break
            case 'SIGNOUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <ModalSignup role='customer' />; break
            case 'SIGNUP_VENDOR': return <ModalSignup role='vendor' />; break
            case 'SIGNUP_DRIVER': return <ModalSignup role='driver' />; break
            default: return null
        }
    }

    return (
        <PopUpModal
            visible={name}
            onRequestClose={close}
            transparent={true}
        >
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                {resolveModalContent()}
            </View>
        </PopUpModal>
    )
}