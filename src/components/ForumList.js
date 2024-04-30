import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '.'
import classes from '@styles/classes'
import { getProfileImagePathFromUser } from '@utils/images'
import {
    useApp,
    useModal,
    useUser,
} from '@context'

const ListItemVertical = ({ item, imagePath, onPress, onDelete = null, ...props }) => {
    
    const { theme } = useApp()
    const { profile } = useUser()
    
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
                        style={{ flexBasis: 'auto', flexGrow: 1 }}
                        onPress={onPress}
                    >
                        <ThemedText
                            style={classes.userHeading}
                        >
                            {author.username}
                            {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                        </ThemedText>

                    </Pressable>

                    {profile._id === author._id && (
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
                    )}

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

const ListItemHorizontal = ({ item, imagePath, onPress, onDelete = null }) => {
    const { author, text } = item
    const [online, setOnline] = useState(false)
    const { dims, theme } = useApp()
    
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
                            style={{ flexBasis: 'auto' }}
                            onPress={onPress}
                        >
                            <ThemedText
                                style={classes.userHeading}
                            >
                                {author.username}
                                {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                            </ThemedText>

                        </Pressable>

                        {profile._id === author._id && (
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
                        )}

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

export default ({ items, onDelete }) => {
    const { landscape, dims } = useApp()
    const { setModal } = useModal()

    return !landscape ? (
        <FlatList
            data={items}
            listKey={() => 'entries'}
            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
            renderItem={({ item }) => (
                <ListItemVertical
                    item={item}
                    imagePath={getProfileImagePathFromUser(item.author)}
                    onDelete={onDelete}
                    onPress={() => setModal('CONTACT', item.author)}
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
                        onDelete={onDelete}
                        onPress={() => setModal('CONTACT', item.author)}
                    />
                )))}
            </View>
        </ScrollView>
    ) 
}