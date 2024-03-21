import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    FeedbackForm,
    ModalCart,
    ModalDestroy,
    ModalImage,
    ModalLocation,
    ModalProfile,
    ModalSignin,
    ModalSignup,
    ModalSignout,
    ModalImageSelector,
    PopUpModal,
    ProductDetailsFake,
    ProductForm,
} from '.'
import { AppContext } from '../AppContext'

export default ({ modal }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const { id, type } = modal

    const resolveModalContent = () => {
        switch(type) {
            case 'CART': return <ModalCart />; break
            case 'DESTROY': return <ModalDestroy />; break
            // case 'SHOW_PRODUCT': return <ProductDetails id={id} />; break
            case 'SHOW_PRODUCT': return <ProductDetailsFake id={id} />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'IMAGE': return <ModalImage id={id} />; break
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
            visible={modal}
            onRequestClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            transparent={true}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    width: '100%',
                    justifyContent: 'space-evenly',
                }}
            >
                {resolveModalContent()}
            </View>
        </PopUpModal>
    )
}