import React, { useContext } from 'react'
import {
    ImageSelector,
} from '.'
import { AppContext } from '../AppContext'

export default () => {

    const {
        dispatch,
    } = useContext(AppContext)

    const uploadImageData = async imageData => {
        
        if (!imageData) {
            dispatch({ type: 'CLOSE_MODAL' })
            return null
        }

        dispatch({ type: 'SET_LOADING', loading: 'Uploading image...' })

        const { data } = await axios
            .post(`/api/image/upload`, imageData)

        dispatch({ type: 'SET_LOADING', loading: null })

        if (!data) {
            console.log('Error uploading image/thumb')
            return null
        }
    }
    
    return (
        <ImageSelector
            onSelected={uploadImageData}
        />
    )
}