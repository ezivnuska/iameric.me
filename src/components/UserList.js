import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { StatusIndicator, UserAvatar } from '@components'
import { loadContactById } from '@utils/contacts'
import { useTheme, useUser } from '@context'
import { ActivityIndicator, Divider, Icon, Text } from 'react-native-paper'

const UserListItem = ({ item, onPress }) => {

    const { landscape } = useTheme()
    const { findUserById, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (item) {
            loadUser(item._id)
        }
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

    if (loading) return <ActivityIndicator animating={true} />

    return user && (
        <Pressable
            onPress={() => onPress(user.username)}
            style={{ flex: 1, paddingBottom: 15, paddingTop: 5, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}
        >
            {landscape
                ? <HorizontalListItem item={user} />
                : <VerticalListItem item={user} />
            }
        </Pressable>
    )
}

const VerticalListItem = ({ item }) => (

    <View style={styles.itemVertical}>

        <View style={styles.itemHeader}>

            <UserAvatar user={item} />

            <Text variant='titleLarge'>
                {item.username}
            </Text>

        </View>

        <StatusIndicator id={item._id} />

    </View>
)

const HorizontalListItem = ({ item, connected = false }) => (

    <View style={styles.itemHorizontal}>

        <UserAvatar user={item} size={100} />
        
        <Text variant='titleLarge'>
            {item.username}
        </Text>

        <StatusIndicator id={item._id} />
        
    </View>
)

const UserList = ({ data, onPress }) => {

    const { landscape } = useTheme()
    return (
        <FlatList
            ItemSeparatorComponent={({ highlighted }) => <Divider />}
            data={data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <UserListItem item={item} onPress={onPress} />}
            horizontal={landscape}
        />
    )
}

export default UserList

const styles = StyleSheet.create({
    itemVertical: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        gap: 10,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    itemHorizontal: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 10,
    },
    itemUsername: {
        // fontWeight: 700,
        // textAlign: 'center',
    }
})