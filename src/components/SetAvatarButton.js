import React, { useMemo } from 'react'
import { IconButton } from '@components'
// import { useUser } from '@user'
// import { setAvatar } from '@utils/images'

const SetAvatarButton = ({ user, image, isAvatar, loading, onPress }) => {
    
    // const isAvatar = useMemo(() => user.profileImage?._id === image?.id, [image, user])
    // const {
    //     setProfileImage,
    //     // user,
    //     userLoading,
    //     setUserLoading,
    // } = useUser()

    // const makeAvatar = async () => {

    //     setUserLoading(true)
    //     const avatar = await setAvatar(user._id, image._id)
    //     setUserLoading(false)

    //     setProfileImage(avatar)
    // }

    // const removeAvatar = async () => {

    //     setUserLoading(true)
    //     await setAvatar(user._id)
    //     setUserLoading(false)

    //     setProfileImage(null)
    // }

    return (
        <IconButton
            name={'image-sharp'}
            color={isAvatar ? 'red' : null}
            onPress={onPress}
            disabled={loading}
            style={{ padding: 3 }}
        />
    )
}

export default SetAvatarButton