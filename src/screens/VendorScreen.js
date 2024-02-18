import React, { useEffect, useState } from 'react'
import {
    Image,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LoadingView,
    Menu,
    Screen,
    ScreenTitle,
} from '@components'
import { loadUserById } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation, route }) => {

    const theme = useTheme()

    const [loading, setLoading] = useState(null)
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {

        if (!route.params || !route.params.id)
            console.log('missing required id param')
        else loadUserDetails(route.params.id)

    }, [])
    

    const loadUserDetails = async id => {
        setLoading('Loading vendor details...')
        const user = await loadUserById(id)
        setUserDetails(user)
        setLoading(null)
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
            
            {loading
                ? <LoadingView label={loading} />
                : userDetails
                    ? (
                        <>
                            <IconButton
                                iconName='arrow-back-outline'
                                onPress={() => navigation.navigate('VendorList')}
                                label='Back'
                                align='left'
                                textStyles={{ color: theme?.colors.textDefault }}
                                transparent
                            />

                            <ScreenTitle title={userDetails.username} />

                            {renderUserAvatar()}

                            <Menu vendor={userDetails} />
                        </>
                    )
                    : null
            }
            
        </Screen>
    )
}