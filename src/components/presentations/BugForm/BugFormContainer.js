import React, { useState } from 'react'
import { View } from 'react-native'
// import { ImagePickerMini } from '@smart'
import { useBugs, useModal, useSocket, useUser } from '@context'
import { uploadImage } from '@utils/images'
import { createEntry } from '@utils/bugs'
import BugFormView from './BugFormView'

const BugFormContainer = () => {

    const { addBug } = useBugs()
    const { closeModal } = useModal()
    const { socket } = useSocket()
    const { setUploading } = useUser()

    const [imageData, setImageData] = useState(null)

    const handleUpload = async () => {
        
        if (process.env.NODE_ENV === 'development') return alert('can\'t upload in dev')
        
        setUploading(true)
        const image = await uploadImage({ ...imageData })
        setUploading(false)
        
        if (image) return image
        else {
            console.log('error uploading image')
            return null
        }
    }

    const handleSubmit = async data => {
        let bugData = data
        // if (imageData) {
        //     console.log('imageData', imageData)
        //     const image = await handleUpload()
        //     console.log('image', image)
        //     if (image) {
        //         bugData = {
        //             ...bugData,
        //             images: [image._id],
        //         }
        //     }
        // }
        
        const bug = await createEntry(bugData)

        addBug(bug)

        socket.emit('new_entry', bug)
        closeModal()

        return bug
    }

    return (
        <View>
            <BugFormView
                onCancel={closeModal}
                onSubmit={handleSubmit}
            />
                    
            {/* <ImagePickerMini onSelection={setImageData} /> */}
                    
        </View>
    )
}

export default BugFormContainer