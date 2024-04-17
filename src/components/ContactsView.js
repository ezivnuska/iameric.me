import React, { useEffect } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    LoadingView,
    ThemedText,
} from '@components'
import { useContacts, useModal } from '@context'
import classes from '@styles/classes'
import { getProfileImagePathFromUser } from '@utils/images'
import axios from 'axios'

export default () => {

    const {
        contacts,
        contactsLoading,
        setContacts,
        setContactsLoading,
    } = useContacts()
    const { setModal } = useModal()
    
    useEffect(() => {
        const init = async () => {
            
            setContactsLoading(true)
            
            const { data } = await axios.get('/api/users')
            
            setContactsLoading(false)
            
            if (!data || !data.users) {
                console.log('Error loading contacts')
            } else setContacts(data.users)
        }
        init()
    }, [])

    const renderContacts = () => contacts.map((contact, index) => (
        <ContactListItem
            item={contact}
            key={`contact-${index}`}
            onPress={() => setModal('CONTACT', contact)}
        />
    ))

    if (contactsLoading) return <LoadingView loading='Loading contacts...' />

    return (
        <View style={{ marginHorizontal: 10 }}>
            {renderContacts()}
        </View>
    )
}

const ContactListItem = ({ item, onPress, ...props }) => {
    const imagePath = getProfileImagePathFromUser(item)
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 15,
                paddingTop: 10,
            }}
            {...props}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    source={imagePath}
                />
            </View>

            <Pressable
                onPress={() => onPress(item)}
                style={{
                    flex: 1,
                    glexGrow: 1,
                }}
            >
                <ThemedText
                    style={classes.userHeading}
                >
                    {item.username}
                    {/* {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />} */}
                </ThemedText>

            </Pressable>
        </View>
    )
}