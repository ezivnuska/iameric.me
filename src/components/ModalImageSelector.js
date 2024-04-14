import React, { useContext } from 'react'
import {
    ImageSelector,
} from '.'
import {
    useModal,
    useUser,
} from '@context'
import axios from 'axios'

export default () => {

    const { closeModal } = useModal()
    const { addImage, userLoading, setUserLoading } = useUser()

    const uploadImageData = async imageData => {
        if (process.env.NODE_ENV === 'development') {
            console.log('cant upload in dev')
            return null
        }

        if (!imageData) {
            closeModal()
            return null
        }

        setUserLoading(true)
        
        const { data } = await axios
            .post(`/api/image/upload`, imageData)
        
        setUserLoading(false)

        if (!data) {
            console.log('Error uploading image/thumb')
        } else {
            addImage(data)
            closeModal()
        }
    }
    
    return (
        <ImageSelector
            onSelected={uploadImageData}
        />
    )
}