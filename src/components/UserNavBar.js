import React, { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconButton } from '@components'
import { useModal, useTheme, useUser } from '@context'
import { navigate } from '@utils/navigation'

const UserNavBar = ({ route }) => {

    const { landscape, styles } = useTheme()
    const { uploading, user, findUserByUsername } = useUser()
    const { setModal } = useModal()

    const currentUser = useMemo(() => route.params?.username && findUserByUsername(route.params.username), [route.params])
    const isCurrentUser = useMemo(() => user.username === currentUser?.username, [currentUser])
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
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
                        style={styles.navLinkFirst}
                    >
                        <Text
                            style={[
                                styles.heading,
                                route.name !== 'Users' ? styles.link : null,
                            ]}
                        >
                            Users
                        </Text>

                    </Pressable>
                {/* )} */}

                <Pressable
                    onPress={() => navigate('Profile', { username: route.params?.username })}
                    disabled={route.name === 'Profile'}
                    style={styles.navLink}
                >
                    <Text
                        style={[
                            styles.heading,
                            route.name !== 'Profile' ? styles.link : null,
                        ]}
                    >
                        {route.params?.username}
                    </Text>

                </Pressable>

                <Pressable
                    onPress={() => navigate('Images', { username: route.params?.username })}
                    disabled={route.name === 'Images'}
                    style={styles.navLinkLast}
                >
                    <Text
                        style={[
                            styles.heading,
                            route.name !== 'Images' ? styles.link : null,
                        ]}
                    >
                        Images
                    </Text>

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