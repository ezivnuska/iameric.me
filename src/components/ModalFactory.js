import React from 'react'
import {
    ModalCart,
    ModalContent,
    ModalDestroy,
    ModalFeatured,
    ModalImage,
    ModalSignin,
    ModalSignup,
    ModalSignout,
    ModalImageSelector,
    ModalLocation,
    ModalProductForm,
} from '.'

export default ({ name }) => {

    const resolveModalContent = () => {
        switch(name) {
            case 'CART': return <ModalCart />; break
            case 'DESTROY': return <ModalDestroy />; break
            case 'FEATURED': return <ModalFeatured />; break
            case 'IMAGE': return <ModalImage />; break
            case 'LOCATION': return <ModalLocation />; break
            case 'PRODUCT': return <ModalProductForm />; break
            case 'SELECT_IMAGE': return <ModalImageSelector />; break
            case 'SIGNIN': return <ModalSignin />; break
            case 'SIGNOUT': return <ModalSignout />; break
            case 'SIGNUP_CUSTOMER': return <ModalSignup role='customer' />; break
            case 'SIGNUP_VENDOR': return <ModalSignup role='vendor' />; break
            case 'SIGNUP_DRIVER': return <ModalSignup role='driver' />; break
            default: return null
        }
    }

    return name ? (
        <ModalContent>
            {resolveModalContent()}
        </ModalContent>
    ) : null
}