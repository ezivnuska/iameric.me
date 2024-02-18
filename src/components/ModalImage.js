import React, { useContext } from 'react'
import {
    ImageDetail,
} from '.'
import { AppContext } from '../AppContext'

export default () => {

    const {
        image,
    } = useContext(AppContext)

    
    return (
        <ImageDetail
            imageData={image}
        />
    )
}