import React, { useContext, useEffect, useState } from 'react'
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
import { AppContext } from 'src/AppContext'

const ListItemVertical = ({ item, imagePath, hasAuth = false, onDelete = null, ...props }) => {
    
    const { author, text } = item
    const [online, setOnline] = useState(false)
    
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
                    }}
                >
                    <Pressable
                        onPress={() => {
                            dispatch({ type: 'SET_PROFILE', profile: author })
                            dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                        }}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {author.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                </View>
                <View
                    style={{
                        flex: 1,
                        flexBasis: 'auto',
                    }}
                >
                    <ThemedText
                        style={{
                            marginTop: 10,
                            textAlign: 'left',
                        }}
                    >
                        {text}
                    </ThemedText>
                </View>

            </View>

            {hasAuth ? (
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <IconButton
                        iconName='trash-outline'
                        onPress={() => onDelete ? onDelete(item._id) : null}
                        textStyles={{ fontSize: 20 }}
                        transparent
                    />
                </View>
            ) : null}
        </View>
    )
}

const ListItemHorizontal = ({ item, imagePath, hasAuth = false, onDelete = null, ...props }) => {
    const dims = useWindowDimensions()
    const { author, text } = item
    const [online, setOnline] = useState(false)
    
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
                flexBasis: dims.width - 50,
            }}
            {...props}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: '100%',
                    height: dims.height - 150,
                    margin: 0,
                }}
                contentContainerStyle={{
                    minHeight: dims.height - 150,
                    width: '100%',
                }}
                snapToInterval={dims.width - 50}
            >
                <View
                    style={{
                        paddingTop: dims.height * 0.05,
                        paddingHorizontal: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'stretch',
                            alignItems: 'flex-start',
                            gap: 15,
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
                                flexBasis: 'auto',
                                flexGrow: 1,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Pressable
                                    style={{
                                        flexBasis: 'auto',
                                        flexGrow: 1,
                                    }}
                                    onPress={() => {
                                        dispatch({ type: 'SET_PROFILE', profile: author })
                                        dispatch({ type: 'SET_MODAL', modalName: 'PROFILE' })
                                    }}
                                >
                                    <ThemedText
                                        align='left'
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
                                        }}
                                    >
                                        <IconButton
                                            iconName='trash-outline'
                                            onPress={() => onDelete ? onDelete(item._id) : null}
                                            textStyles={{ fontSize: 20 }}
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
                
                </View>
                
            </ScrollView>
        </View>
    )
}

export default ({ items, onDelete, horizontal = false, ...props }) => {
    const dims = useWindowDimensions()
    const {
        user,
    } = useContext(AppContext)
    const authorized = item => (item.author._id === user._id || user.role === 'admin')
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
            }}
        />
    ) : (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
                height: dims.height - 150,
                margin: 0,
            }}
            contentContainerStyle={{
                minHeight: dims.height - 150,
                width: '100%',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'nowrap',
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