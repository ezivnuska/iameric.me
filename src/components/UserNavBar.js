import React, { useEffect, useMemo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useApp, useModal, useUser } from '@context'
import { navigate } from '@utils/navigation'

const UserNavBar = ({ route, size }) => {

    const { landscape } = useApp()
    const { uploading, user, findUserByUsername } = useUser()
    const { setModal } = useModal()

    const currentUser = useMemo(() => route.params?.username && findUserByUsername(route.params.username), [route.params])
    const isCurrentUser = useMemo(() => user.username === currentUser?.username, [currentUser])

    // useEffect(() => {
    //     console.log('currentUser', currentUser)
    // }, [currentUser])
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                // width: '100%',
                // maxWidth: 600,
                // maxWidth: landscape ? '90%' : 400,
                // marginHorizontal: 'auto',
                paddingHorizontal: 10,
                // borderWidth: 1,
            }}
            >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 50,
                }}
            >
                {/* {!isCurrentUser && ( */}
                    <Pressable
                        onPress={() => navigate('Users')}
                        disabled={route.name === 'Users'}
                        style={styles.leftButton}
                    >
                        <TextCopy
                            size={size}
                            color={route.name !== 'Users' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                            bold
                        >
                            Users
                        </TextCopy>

                    </Pressable>
                {/* )} */}

                <Pressable
                    onPress={() => navigate('Profile', { username: route.params?.username })}
                    disabled={route.name === 'Profile'}
                    style={styles.centerButton}
                >
                    <TextCopy
                        size={size}
                        color={route.name === 'Profile' ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                        bold
                    >
                        {route.params?.username}
                    </TextCopy>

                </Pressable>

                <Pressable
                    onPress={() => navigate('Images', { username: route.params?.username })}
                    disabled={route.name === 'Images'}
                    style={styles.rightButton}
                >
                    <TextCopy
                        size={size}
                        color={route.name === 'Images' ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                        bold
                    >
                        Images
                    </TextCopy>

                </Pressable>
                
            </View>

            {/* image controls */}

            {route.name === 'Images' && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    {isCurrentUser && (
                        <IconButton
                            name='add-outline'
                            onPress={() => setModal('IMAGE_UPLOAD')}
                            color={!uploading ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                            size={26}
                            disabled={uploading}
                        />
                    )}

                    {!landscape && (
                        <IconButton
                            name='grid-outline'
                            onPress={() => navigate('Images', {
                                username: route.params?.username,
                                list: false,
                            })}
                            color={route.params?.list ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                            size={22}
                            disabled={!route.params?.list}
                        />
                    )}

                    {!landscape && (
                        <IconButton
                            name='menu-outline'
                            onPress={() => navigate('Images', {
                                username: route.params?.username,
                                list: true,
                            })}
                            color={route.params?.list ? 'rgba(0, 0, 0, 0.75)' : 'tomato'}
                            size={30}
                            disabled={route.params?.list}
                        />
                    )}

                </View>
            )}
        </View>
    )
}

export default UserNavBar

const styles = StyleSheet.create({
    leftButton: {
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.5)',
        marginRight: 10,
    },
    centerButton: {
        paddingRight: 10,
    },
    rightButton: {
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(0, 0, 0, 0.5)',
    },
})