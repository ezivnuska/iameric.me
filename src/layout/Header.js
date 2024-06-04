import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    Brand,
    IconButton,
    ThemedText,
} from '@components'
import {
    useApp,
    useModal,
} from '@context'
import { navigationRef } from '@navigation/RootNavigation'
import { loadProfileImage } from '@utils/user'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = ({ profile }) => {

    const { theme, updateUser } = useApp()

    const username = useMemo(() => profile.username, [profile])
    const profileImage = useMemo(() => profile.profileImage, [profile])

    const [ source, setSource ] = useState(`${IMAGE_PATH}/avatar-default-small.png`)
    
    useEffect(() => {
        const getSource = async () => {
            let src = source
            // console.log('getting image source (profileImage)', profileImage)
            if (profileImage && typeof profileImage === 'string') {
                const image = await loadProfileImage(profileImage)
                console.log('image', image)
                if (!image) console.log('could not load profile image')
                else updateUser({ profileImage: image })
            }
            if (profileImage) {
                src = `${IMAGE_PATH}/${username}/${profileImage.filename}`
            }
            setSource(src)
        }
        getSource()
    }, [profile])
    
    return (
        <Pressable
            onPress={() => navigationRef.navigate('User')}
            style={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                marginLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                // backgroundColor: theme?.colors.screen,
                // shadowColor: theme?.colors.shadow,
                // shadowOffset: {
                //     width: 0,
                //     height: 0,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3,
                // elevation: 1,
                paddingVertical: 2,
                paddingHorizontal: 8,
            }}
        >
            <Image
                source={source}
                style={{
                    flexBasis: 26,
                    flexGrow: 0,
                    width: 26,
                    height: 26,
                    marginRight: 8,
                    borderRadius: 13,
                    overflow: 'hidden',
                    resizeMode: 'cover',
                    borderWidth: 0.5,
                    borderColor: '#ccc',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
            />

            <ThemedText
                style={{
                    flex: 1,
                    fontWeight: 700,
                    lineHeight: 30,
                }}
            >
                {profile.username}
            </ThemedText>
            
        </Pressable>
    )
}

export default () => {

    const {
        dark,
        profile,
        toggleTheme,
        userLoaded,
    } = useApp()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                opacity: 1,
                flexWrap: 'wrap',
                height: 50,
            }}
        >
            <Brand onPress={toggleTheme} />

            <IconButton
                iconName={`${dark ? 'sunny' : 'moon'}-outline`}
                onPress={toggleTheme}
                transparent
                padded
                style={{ flexGrow: 0 }}
                textStyles={{ fontSize: 18 }}
            />

            {
                profile
                    ? (
                        <>
                            <UserButton profile={profile} />
                            <SignOutButton />
                        </>
                    )
                    : <SignInButton />
            }

        </View>
    )
}

const SignInButton = () => {

    const { appLoading } = useApp()
    const { setModal } = useModal()
    
    return (
        <IconButton
            iconName='log-in-outline'
            label='Sign In'
            onPress={() => setModal('SIGN_IN')}
            disabled={appLoading}
            alignIcon='right'
            transparent
            style={{ marginLeft: 10 }}
        />
    )
}

const SignOutButton = () => {

    const { appLoading, theme } = useApp()
    const { setModal } = useModal()
    
    return (
        <IconButton
            onPress={() => setModal('SIGN_OUT')}
            disabled={appLoading}
            iconName='close-outline'
            textStyles={{
                color: theme?.colors.textDefault,
                fontSize: 22,
            }}
            transparent
            style={{
                flexGrow: 0,
                // marginHorizontal: 8,
            }}
        />
    )
}