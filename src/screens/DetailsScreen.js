import React, { useEffect, useState } from 'react'
import {
    Image,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LoadingView,
    Screen,
    ScreenTitle,
    UserImageModule,
} from '@components'
import { loadUserById } from '../utils/data'
import classes from '../styles/classes'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route, id, title, username }) => {

    const [loading, setLoading] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        loadUserDetails(id)
    }, [])

    const loadUserDetails = async id => {
        const user = await loadUserById(id)
        setUserDetails(user)
    }

    // TODO: clean this.
    const renderUserAvatar = () => {

        const { profileImage, username } = userDetails

        const filename = (profileImage && profileImage.filename)
            ? profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`
        
        return (
            <Image
                source={source}
                style={{
                    width: profileImage ? profileImage.width : 250,
                    height: profileImage ? profileImage.width : 250,
                    resizeMode: 'cover',
                    marginVertical: 15,
                }}
            />
        )
    }

    return (
        <Screen navigation={navigation}>
            
            <ScreenTitle title={title} />

            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <IconButton
                                iconName='arrow-back-outline'
                                onPress={() => navigation.navigate('UserList')}
                                label='Back'
                                align='left'
                                transparent
                            />

                            <ThemedText style={classes.headerSecondary}>
                                {userDetails.username}
                            </ThemedText>

                            {renderUserAvatar()}

                            <UserImageModule user={userDetails} />
                        </>
                    )
                    : null
            }
            
        </Screen>
    )
}