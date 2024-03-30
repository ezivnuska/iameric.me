import React, { useContext } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import {
    FeedbackForm,
    // Form,
    ModalCart,
    ModalDestroy,
    ModalImage,
    ModalLocation,
    ModalProfile,
    // ModalSignup,
    ModalSignout,
    ModalImageSelector,
    PopUpModal,
    ProductDetails,
    ProductForm,
    FormSignIn,
    FormSignUp,
} from '.'
import { AppContext } from '../AppContext'

export default () => {
    const dims = useWindowDimensions()
    const {
        dispatch,
        modal,
    } = useContext(AppContext)

    const { data, type } = modal

    const resolveModalContent = () => {
        switch(type) {
            case 'CART': return <ModalCart />; break
            case 'DESTROY': return <ModalDestroy />; break
            // case 'SHOW_PRODUCT': return <ProductDetails id={id} />; break
            case 'SHOW_PRODUCT': return <ProductDetails product={data.product} />; break
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
            isVisible={modal !== undefined}
            onRequestClose={() => dispatch({ type: 'CLOSE_MODAL' })}
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