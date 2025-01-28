import React, { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { Time, UserAvatar } from '@components'
import { Card, IconButton, MD3Colors, Text } from 'react-native-paper'
import { useUser } from '@context'
import { navigate } from '@utils/navigation'

const BugListItem = ({ item, loading, onDelete = null }) => {

    const { user } = useUser()

    const authorized = useMemo(() => item && (user._id === item.author?._id || user.role === 'admin'), [item])

    return (
        <View
            style={{ paddingBottom: 20, paddingTop: 5 }}
        >
            
            <Card.Title
                title={item.author.username}
                titleVariant='titleMedium'
                subtitle={<Time time={item.createdAt} />}
                style={{ gap: 10 }}
                left={() => <UserAvatar user={item.author} />}
                right={() => authorized && (
                    <IconButton 
                        icon='delete-circle'
                        onPress={() => onDelete(item._id)}
                        disabled={loading}
                        iconColor={MD3Colors.error50}
                        size={30}
                    />
                )}
            />
            
            {/* <Image
                source={source}
                resizeMode='contain'
                style={{ flex: 1, flexGrow: 1 }}
            /> */}

            <Card.Content>
                <Text variant='bodyLarge'>{item.text}</Text>
            </Card.Content>
            
            {/* {(isOwner || hasAuthorization) && (
                <Card.Actions>
                    {isOwner && (
                        <Button
                            mode='text'
                            onPress={handleAvatar}
                        >
                            {isProfileImage ? 'Unset Avatar' : 'Set Avatar'}
                        </Button>
                    )}
                    {(
                        <Button
                            mode='text'
                            onPress={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    )}
                </Card.Actions>
            )} */}
        </View>
    )

    return (
        <View
            key={`bug-${item._id}`}
            style={{
                flexGrow: 0,
                marginBottom: 20,
                gap: 5,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                        flexShrink: 1,
                        gap: 7,
                        flexWrap: 'wrap',
                    }}
                >
                    <Pressable
                        onPress={() => navigate('User', { screen: 'Profile', params: { username: item.author.username } })}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexGrow: 1,
                            flexShrink: 0,
                            gap: 10,
                        }}
                    >
                        <UserAvatar
                            user={item.author}
                            size={50}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                                gap: 10,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexGrow: 1,
                                }}
                            >
                                <Text variant='titleMedium'>
                                    {item.author.username}
                                </Text>

                                <Time
                                    time={item.createdAt}
                                    size={18}
                                    color='#777'
                                    style={{ lineHeight: 25 }}
                                />

                            </View>

                            {(user._id === item.author._id || user.role === 'admin') && (
                                <IconButton
                                    icon='delete-forever'
                                    onPress={() => onDelete(item._id)}
                                    disabled={loading}
                                />
                            )}

                        </View>

                    </Pressable>

                </View>

            </View>

            <Text variant='bodyLarge'>
                {item.text}
            </Text>

        </View>
    )
}

export default BugListItem