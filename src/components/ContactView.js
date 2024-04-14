import React from 'react'
import {
    FlatList,
    Image,
    LoadingView,
    Pressable,
    useWindowDimensions,
    ScrollView,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useContacts } from '@context'
import classes from '@styles/classes'
import { getProfileImagePathFromUser } from '@utils/images'
import axios from 'axios'

export default ContactList = () => {

    const {
        contacts,
        contactsLoading,
        setContacts,
        setLoadingContacts,
    } = useContacts()

    useEffect(() => {
        const init = async () => {
            
            setLoadingContacts(true)
            
            const { data } = await axios.get('/api/users')
            
            setLoadingContacts(false)
            
            if (data && data.users) {
                setContacts(data.users)
            }
        }
        init()
    }, [])

    const renderContacts = () => contacts.map((contact, index) => (
        <ContactListItem
            item={contact}
            key={`contact-${index}`}
            onPress={() => null}
        />
    ))

    if (contactsLoading) return <LoadingView loading='Loading contacts...' />

    return (
        <View>
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