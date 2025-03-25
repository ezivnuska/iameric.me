import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Divider, Icon, Text } from 'react-native-paper'
import { BondIndicator, StatusIndicator, SmartAvatar } from '@components'
import { loadContactById } from '@utils/contacts'
import { useBonds, useSocket, useTheme, useUser } from '@context'

const UserListItem = ({ item, onPress }) => {

    const { landscape } = useTheme()
    const { authUser, findUserById, updateUser } = useUser()
    const { connections } = useSocket()

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    
    const isConnected = useMemo(() => connections.map(c => c.userId).indexOf(item._id) > -1, [connections])

    useEffect(() => {
        if (item) {
            loadUser(item._id)
        }
    }, [])

    useEffect(() => {
        if (user) {
            updateUser(user)
        }
    }, [user])
    
    const loadUser = async id => {

        setLoading(true)

        let contact = findUserById(id)
        
        if (!contact) contact = await loadContactById(id)
        
        if (contact) {
            setUser(contact)
        } else console.log('could not find or load user data.')

        setLoading(false)
        
    }

    if (loading) return <ActivityIndicator animating={true} />

    return user && (
        <Pressable
            onPress={() => onPress(user.username)}
            style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 5,
            }}
        >
            {landscape
                ? <HorizontalListItem item={user} connected={isConnected} />
                : <VerticalListItem item={user} connected={isConnected} />
            }
        </Pressable>
    )
}

const VerticalListItem = ({ item, connected }) => {

    const { user } = useUser()

    return (

        <View style={styles.itemVertical}>

            <View style={[styles.itemHeader, { gap: 15 }]}>

                <SmartAvatar user={item} size={30} />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: connected && 'green',
                        gap: 5,
                        height: 30,
                        borderRadius: 15,
                        paddingLeft: 15,
                        paddingRight: 10,
                    }}
                >
                    <Text
                        variant='titleMedium'
                        style={{ color: (connected && '#fff') }}
                    >
                        {item.username}
                    </Text>

                    {connected && (
                        <Icon
                            source='lightning-bolt'
                            size={16}
                            color='#fff'
                        />
                    )}

                </View>
                
            </View>

            {/* <StatusIndicator id={item._id} /> */}

            {(user._id !== item._id) && <BondIndicator userId={item._id} />}

        </View>
    )
}

const HorizontalListItem = ({ item, connected }) => {

    const { user } = useUser()

    return (

        <View style={styles.itemHorizontal}>

            <SmartAvatar user={item} size={100} />
            
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: connected && 'green',
                    gap: 5,
                    height: 30,
                    borderRadius: 15,
                    paddingLeft: 15,
                    paddingRight: 10,
                }}
            >
                <Text
                    variant='titleMedium'
                    style={{ color: (connected && '#fff') }}
                >
                    {item.username}
                </Text>

                {connected && (
                    <Icon
                        source='lightning-bolt'
                        size={16}
                        color='#fff'
                    />
                )}

            </View>

            {(user._id !== item._id) && <BondIndicator userId={item._id} />}
            
        </View>
    )
}

const UserList = ({ data, onPress }) => {

    const { getBond } = useBonds()
    const { landscape } = useTheme()

    const [filter, setFilter] = useState('all')

    const users = useMemo(() => filter === 'bonded' ? data.filter(user => {
        const bond = getBond(user._id)
        return (bond && bond.confirmed)
    }) : data, [filter])

    return users && (
        <View style={{ flex: 1 }}>
            
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginHorizontal: 15
                }}
            >
                <Button
                    mode='contained'
                    onPress={() => setFilter(filter === 'bonded' ? 'all' : 'bonded')}
                >
                    {filter === 'all' ? 'Connections' : 'All'}
                </Button>
            </View>

            <FlatList
                ItemSeparatorComponent={({ highlighted }) => <Divider />}
                data={users}
                extraData={users}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <UserListItem item={item} onPress={onPress} />}
                horizontal={landscape}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1, alignItems: (landscape && 'center') }}
            />
        </View>
    )
}

export default UserList

const styles = StyleSheet.create({
    itemVertical: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        gap: 10,
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 10,
    },
    itemHorizontal: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    itemUsername: {
        // fontWeight: 700,
        // textAlign: 'center',
    }
})