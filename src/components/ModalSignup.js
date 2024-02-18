import React, { useContext } from 'react'
import {
    SignUpForm,
} from '.'
import { AppContext } from '../AppContext'

export default ({ role }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const setUser = async ({
        _id,
        email,
        images,
        profileImage,
        role,
        token,
        username,
        exp,
    }) => {
        dispatch({
            type: 'SET_USER',
            user: {
                _id,
                email,
                images,
                profileImage,
                role,
                token,
                username,
                exp,
            },
        })
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onModalClosed = response => {
        setUser(response)
        dispatch({ type: 'CLOSE_MODAL' })
    }
    
    return (
        <SignUpForm
            role={role}
            onComplete={onModalClosed}
        />
    )
}