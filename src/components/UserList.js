import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { ActivityIndicator, StatusIndicator, TextCopy, UserAvatar } from '@components'
import { loadContactById } from '@utils/contacts'
import { useApp, useUser } from '@context'

const UserListItem = ({ item, onPress }) => {

    const { landscape } = useApp()
    const { findUserById, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (item) loadUser(item._id)
    }, [])

    useEffect(() => {
        if (user) updateUser(user)
    }, [user])
    
    const loadUser = async id => {

        setLoading(true)

        let contact = findUserById(id)
        
        if (!contact) contact = await loadContactById(id)
        
        if (contact) setUser(contact)
        else console.log('could not find or load user data.')

        setLoading(false)
        
    }

    return !loading && user ? (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Pressable
                onPress={() => onPress(user.username)}
                style={{
                    flex: 1,
                    paddingHorizontal: 5,
                }}
            >
                {
                    landscape
                        ? <HorizontalListItem item={user} />
                        : <VerticalListItem item={user} />
                }
            </Pressable>
        </View>
    ) : <ActivityIndicator size='small' />
}

const VerticalListItem = ({ item }) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
        }}
    >
        <View style={{ flexGrow: 0 }}>

            <UserAvatar
                size={30}
                user={item}
            />

        </View>

        <View
            style={{
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
            }}
        >

            <View style={{ flexGrow: 1 }}>

                <TextCopy>
                    {item.username}
                </TextCopy>
                
            </View>

            <View style={{ flexGrow: 0 }}>
                
                <StatusIndicator id={item._id} />

            </View>

        </View>
    </View>
)

const HorizontalListItem = ({ item }) => (

    <View
        style={{
            justifyContent: 'center',
            gap: 5,
        }}
    >

        <UserAvatar size={100} user={item} />
        
        <TextCopy bold align='center'>
            {item.username}
        </TextCopy>
        
        <View style={{ marginHorizontal: 'auto' }}>
            <StatusIndicator id={item._id} />
        </View>
        
    </View>
)

const UserList = ({ data, onPress }) => {

    const { landscape } = useApp()

    return (
        <FlatList
            ItemSeparatorComponent={({ highlighted }) => <View style={{ height: 10 }} />}
            data={data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <UserListItem item={item} onPress={onPress} />}
            horizontal={landscape}
            style={{
                flex: 1,
                paddingVertical: 20,
            }}
        />
    )
}

export default UserList