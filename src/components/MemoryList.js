import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { Time, UserAvatar } from '@components'
import { useMemory, useModal, useSocket, useUser } from '@context'
import { deleteMemoryWithId, loadMemory } from '@utils/memories'
import { getMaxImageDims } from '@utils/images'
import {
    getDate,
    getDay,
    getMonth,
    getYear,
    endOfDay,
    format,
    formatDistance,
    formatRelative,
    subDays,
    getDaysInMonth,
    parseISO,
} from 'date-fns'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const MemoryListItem = ({ onDelete, navigation, item, authorized = false }) => {
   
    const { updateMemory } = useMemory()
    const { setModal } = useModal()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [memory, setMemory] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    const year = useMemo(() => item?.year, [item])
    const month = useMemo(() => item?.month, [item])
    const day = useMemo(() => item?.day, [item])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])

    useEffect(() => {
        if (item) initMemory(item._id)
    }, [])

    // useEffect(() => {
    //     if (date) console.log('date', date.toDateString())
    // }, [date])

    useEffect(() => {
        if (memory?.image) {
            const dims = getMaxImageDims(memory.image.width, memory.image.height, 100)
            setImageDims(dims)
        }
    }, [memory])
        
    const initMemory = async id => {
        
        setLoading(true)
        
        let result = await loadMemory(id)
        
        if (result) {
            setMemory(result)
            updateMemory(result)
        }
        else console.log('could not find or load memory data.')

        setLoading(false)
        
    }

    return memory && (
        <View>

            <Card.Title
                title={memory.author.username}
                titleVariant='titleMedium'
                subtitle={<Time time={memory.createdAt} />}
                style={{ gap: 10 }}
                left={() => (
                    <UserAvatar
                        user={memory.author}
                        onPress={() => navigation.navigate('User', { screen: 'Profile', params: { username: memory.author?.username } })}
                    />
                )}
                right={() => authorized && (
                    <IconButton
                        icon='delete-forever'
                        mode='contained'
                        onPress={() => onDelete(memory._id)}
                        disabled={loading}
                    />
                )}
            />

            <Card.Content
                style={{
                    paddingBottom: 20,
                    // gap: 15,
                    paddingRight: 0,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 15,
                    }}
                >

                    {memory.image && imageDims && (
                        <Pressable
                            onPress={() => setModal('SHOWCASE', memory.image)}
                        >
                            <Image
                                source={`${IMAGE_PATH}/${memory.author.username}/${memory.image.filename}`}
                                resizeMode='contain'
                                style={{
                                    width: imageDims.width,
                                    height: imageDims.height,
                                }}
                            />
                        </Pressable>
                    )}
                    
                    <View style={{ flexGrow: 1 }}>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >

                            {date && (
                                <Text variant='titleMedium'>
                                    {date.toDateString()}
                                </Text>
                            )}

                            {authorized && (
                                <IconButton
                                    icon='comment-edit-outline'
                                    onPress={() => setModal('MEMORY', memory)}
                                    // style={{ borderWidth: 1 }}
                                />
                            )}


                        </View>

                        <Text variant='bodyLarge'>
                            {memory.body}
                        </Text>

                    </View>

                </View>
                    
            </Card.Content>
        </View>
    )
}

const MemoryList = props => {

    const {
        memories,
        updateMemory,
        deleteMemory,
    } = useMemory()

    const { closeModal, setModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    const [items, setItems] = useState(memories)
    const [loading, setLoading] = useState(false)

    const listRef = useRef()

    useEffect(() => {
        socket.on('new_memory', updateMemory)
        socket.on('deleted_memory', deleteMemory)
    }, [])

    useEffect(() => {
        setItems(memories)
    }, [memories])

    const removeMemory = async id => {

        setLoading(true)

        await deleteMemoryWithId(id)
        
        setLoading(false)

        socket.emit('memory_deleted', id)

        deleteMemory(id)

        closeModal()
        
    }
    
    return (
        <Card
            elevation={0}
            style={{ flex: 1 }}
        >

            <Card.Title
                title='Memories'
                titleVariant='titleLarge'
                // left={() => <IconButton icon='home' onPress={() => props.navigation.navigate('Memories')} />}
                right={() => <IconButton icon='plus-thick' onPress={() => setModal('MEMORY')} size={30} />}
                style={{ padding: 0, marginLeft: 15 }}
            />

            <Card.Content style={{ padding: 0 }}>
                
                {items && (
                    <FlatList
                        ref={listRef}
                        data={items}
                        extraData={items}
                        keyExtractor={item => `memory-${item._id}`}
                        renderItem={({ item }) => {
                            const authorized = user && (user._id === item.author?._id || user.role === 'admin')
                            return (
                                <MemoryListItem
                                    item={item}
                                    navigation={props.navigation}
                                    onDelete={removeMemory}
                                    onEdit={() => setModal('MEMORY', item)}
                                    disabled={loading}
                                    authorized={authorized}
                                />
                            )
                        }}
                        ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 5 }} />}
                    />
                )}

            </Card.Content>

        </Card>
    )
}

export default MemoryList