import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, StatusIndicator, TextCopy } from '@components'
import { loadContactById } from '@utils/contacts'
import { useUser } from '@context'

const FlatListItem = ({ id, username, onPress }) => {

    const { findUserById, updateUser, userLoading, setUserLoading } = useUser()

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (id) loadUser(id)
    }, [])
    
    const loadUser = async id => {

        setUserLoading(true)

        let contact = findUserById(id)
        
        if (!contact) {

            contact = await loadContactById(id)

        }
        
        setUserLoading(false)
        
        if (contact) {
            setUser(contact)
            updateUser(contact)
        }
    }

    return !userLoading && user
        ? (
            <Pressable
                onPress={() => onPress(user.username)}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                    paddingBottom: 5,
                    marginBottom: 5,
                }}
            >
                <View style={{ flexGrow: 0 }}>
                    <ProfileImage
                        // image={user.profileImage}
                        size={30}
                        user={user}
                    />
                </View>

                <View style={{ flexGrow: 0 }}>
                    <StatusIndicator id={user._id} />
                </View>

                <View style={{ flexGrow: 1 }}>
                    <TextCopy color='#000'>
                        {user.username}
                    </TextCopy>
                </View>
            </Pressable>
        )
        : <ActivityIndicator size='small' />
}

const FlatListView = ({ data, onPress }) => {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => <FlatListItem id={item._id} username={item.username} onPress={onPress} />}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default FlatListView