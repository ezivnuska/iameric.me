import React, { useContext } from 'react'
import {
    DestroyForm,
} from '.'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)
    
    return (
        <DestroyForm />
    )
}