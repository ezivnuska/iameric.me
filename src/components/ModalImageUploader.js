import React, { useContext } from 'react'
import {
    ImageSelector,
} from '.'
import { AppContext } from '@context'
import axios from 'axios'

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
   
        if (!data) {
            console.log('Error uploading image/thumb')
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }
    
    return (
        <ImageSelector
            onSelected={uploadImageData}
        />
    )
}