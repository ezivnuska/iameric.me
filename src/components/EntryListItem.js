import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
    UserHeading,
} from '@components'
import { AppContext } from '../AppContext'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'
import { getProfileImagePathFromUser } from '@utils/images'
import { navigationRef } from 'src/navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ListItemVertical = ({ entry, onDelete = null, ...props }) => {
    const imagePath = getProfileImagePathFromUser(entry.author)
    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const { author, text } = entry

    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (user && user.exp) {
            const newDate = new Date(user.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [user])
        
    return (
        <View
            style={{
                width: '100%',
                maxWidth: 600,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexGrow: 1,
                paddingTop: 10,
                paddingHorizontal: 10,
                gap: 15,
                borderBottomWidth: 1,
                borderBottomStyle: 'dotted',
                borderBottomColor: '#ccc',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexBasis: 'auto',
                    flexGrow: 0,
                    borderWidth: 1,
                    borderColor: '#ccc',
                }}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                    }}
                    // onLoadStart={() => setLoading(true)}
                    // onLoadEnd={() => setLoading(false)}
                    source={imagePath}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                    }}
                >
                    <Pressable
                        onPress={() => {
                            // dispatch({ type: 'SET_PROFILE', profile: author })
                            // dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                            console.log('author', author)
                            navigationRef.navigate('Forum')
                        }}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {user.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                </View>
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}
                >
                    <ThemedText
                        style={{
                            marginTop: 10,
                            textAlign: 'left',
                            paddingBottom: 10,
                        }}
                    >
                        {text}
                    </ThemedText>
                </View>

            </View>

            {(author._id === user._id || user.role === 'admin') ? (
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <IconButton
                        iconName='trash-outline'
                        onPress={() => onDelete(entry._id)}
                        textStyles={{ fontSize: 20 }}
                        transparent
                    />
                </View>
            ) : null}
        </View>
    )
}

const ListItemHorizontal = ({ entry, onDelete = null, ...props }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const { author, text } = entry

    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (entry.author && entry.author.exp) {
            const newDate = new Date(entry.author.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [entry])
    
    const getSource = () => author.profileImage?.filename
        ? `${IMAGE_PATH}/${author.username}/${author.profileImage?.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
        
    return (
        <View
            style={{
                width: '100%',
                maxWidth: 600,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                flexGrow: 1,
                paddingTop: 10,
                paddingHorizontal: 10,
                gap: 15,
                borderRightWidth: 1,
                borderStyle: 'dotted',
                borderColor: '#ccc',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                    }}
                    // onLoadStart={() => setLoading(true)}
                    // onLoadEnd={() => setLoading(false)}
                    source={getSource()}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                    }}
                >
                    <Pressable
                        onPress={() => {
                            // dispatch({ type: 'SET_PROFILE', profile: author })
                            // dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                            console.log('author', author)
                            navigationRef.navigate('Users', { screen: 'User', params: { id: author._id } })
                            // navigate('Tabs', { screen: 'Forum' })
                        }}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {user.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                </View>
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}
                >
                    <ThemedText
                        style={{
                            marginTop: 10,
                            textAlign: 'left',
                            paddingBottom: 10,
                        }}
                    >
                        {text}
                    </ThemedText>
                </View>

            </View>

            {(author._id === user._id || user.role === 'admin') ? (
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <IconButton
                        iconName='trash-outline'
                        onPress={() => onDelete(entry._id)}
                        textStyles={{ fontSize: 20 }}
                        transparent
                    />
                </View>
            ) : null}
        </View>
    )
}

export default ({ entry, onDelete }) => {
    
    const {
        isLandscape,
    } = useContext(AppContext)
        
    return isLandscape
        ? <ListItemHorizontal entry={entry} onDelete={onDelete} />
        : <ListItemVertical entry={entry} onDelete={onDelete} />
}