import React from 'react'
import { ImageList } from '@components'

const ContactImagesView = ({ images, onPress, list = false }) => (
    <ImageList
        images={images}
        onPress={onPress}
        list={list}
    />
)

export default ContactImagesView