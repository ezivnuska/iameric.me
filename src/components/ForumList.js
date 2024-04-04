import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    Pressable,
    useWindowDimensions,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '.'
import classes from '@styles/classes'
import { getProfileImagePathFromUser } from '@utils/images'
import { useApp, useUser } from '@context'
// import { useTheme } from 'react-native-paper'
import { navigationRef } from '../navigation/RootNavigation'

const ListItemVertical = ({ item, imagePath, hasAuth = false, onDelete = null, ...props }) => {
    
    const { author, text } = item
    const [online, setOnline] = useState(false)
    const { theme } = useApp()
    
    useEffect(() => {
        if (author && author.exp) {
            const newDate = new Date(author.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [item])

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
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

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 6,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomStyle: 'dotted',
                        borderBottomColor: theme?.colors.border,
                    }}
                >
                    <Pressable
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 1,
                        }}
                        onPress={() => {
                            navigationRef.navigate('Users', { screen: 'User', params: { id: author._id } })
                        }}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {author.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                    {hasAuth ? (
                        <View
                            style={{
                                flexBasis: 'auto',
                                flexGrow: 0,
                                marginTop: -1,
                            }}
                        >
                            <IconButton
                                iconName='trash-outline'
                                onPress={() => onDelete ? onDelete(item._id) : null}
                                textStyles={{ fontSize: 15 }}
                                transparent
                            />
                        </View>
                    ) : null}

                </View>
                
                <ThemedText
                    style={{
                        flex: 1,
                        paddingRight: 30,
                        paddingBottom: 20,
                    }}
                >
                    {text}
                </ThemedText>

            </View>

        </View>
    )
}

const ListItemHorizontal = ({ item, imagePath, hasAuth = false, onDelete = null, ...props }) => {
    const { author, text } = item
    const [online, setOnline] = useState(false)
    const dims = useWindowDimensions()
    const { theme } = useApp()
    
    useEffect(() => {
        if (author && author.exp) {
            const newDate = new Date(author.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [item])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                width: '100%',
                maxWidth: 600,
                minWidth: '50%',
            }}
        >
            <View
                style={{
                    width: '100%',
                    maxWidth: 600,
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: 15,
                    paddingHorizontal: 10,
                    marginTop: dims.height < 400 ? '5%' : dims.height < 600 ? '15%' : '33%',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                        flexGrow: 0,
                        flexShrink: 0,
                    }}
                >
                    
                    <Image
                        style={{
                            width: 70,
                            height: 70,
                        }}
                        source={imagePath}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                >
                
                    <View
                        style={{
                            flexBasis: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomStyle: 'dotted',
                            borderBottomColor: theme?.colors.border,
                        }}
                    >
                        <Pressable
                            style={{
                                flexBasis: 'auto',
                            }}
                            onPress={() => {
                                console.log('author', author)
                                navigationRef.navigate('Users', { screen: 'User', params: { id: author._id } })
                            }}
                        >
                            <ThemedText
                                style={classes.userHeading}
                            >
                                {author.username}
                                {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                            </ThemedText>

                        </Pressable>

                        {hasAuth ? (
                            <View
                                style={{
                                    flexBasis: 'auto',
                                    flexGrow: 0,
                                    marginTop: -2,
                                }}
                            >
                                <IconButton
                                    iconName='trash-outline'
                                    onPress={() => onDelete ? onDelete(item._id) : null}
                                    textStyles={{ fontSize: 15 }}
                                    transparent
                                />
                            </View>
                        ) : null}

                    </View>
                    
                    <ThemedText
                        style={{
                            marginTop: 10,
                            textAlign: 'left',
                            paddingBottom: 20,
                        }}
                    >
                        {text}
                    </ThemedText>
                </View>
            </View>

        </ScrollView>
    )
}

export default ({ items, onDelete, horizontal = false, ...props }) => {
    const dims = useWindowDimensions()
    const { profile } = useUser()
    const authorized = item => (item.author._id === profile._id || profile.role === 'admin')
    return !horizontal ? (
        <FlatList
            data={items}
            listKey={() => 'entries'}
            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
            renderItem={({ item }) => (
                <ListItemVertical
                    item={item}
                    imagePath={getProfileImagePathFromUser(item.author)}
                    hasAuth={authorized(item)}
                    onDelete={onDelete}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 20,
            }}
        />
    ) : (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
                height: dims.height - 150,
                margin: 0,
                width: '100%',
            }}
            contentContainerStyle={{
                maxWidth: 900,
                marginHorizontal: 'auto',
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',

                }}
            >
                {items.map(((item, index) => (
                    <ListItemHorizontal
                        item={item}
                        imagePath={getProfileImagePathFromUser(item.author)}
                        key={'entry' + index}
                        hasAuth={authorized(item)}
                        onDelete={onDelete}
                    />
                )))}
            </View>
        </ScrollView>
    ) 
}