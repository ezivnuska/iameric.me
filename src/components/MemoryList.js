import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { Time, UserAvatar } from '@components'
import { useMemory, useModal, useSocket, useUser } from '@context'
import { deleteMemoryWithId, loadMemory } from '@utils/memories'
import { getMaxImageDims } from '@utils/images'
import { getTime } from '@utils/time'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const MemoryListItem = ({ onDelete, navigation, memoryId, ...props }) => {
   
    const { memories, updateMemory } = useMemory()
    const { setModal } = useModal()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)

    const memory = useMemo(() => memories && memories.filter(m => m._id === memoryId)[0], [memories])
    const year = useMemo(() => memory?.year, [memory])
    const month = useMemo(() => memory?.month, [memory])
    const day = useMemo(() => memory?.day, [memory])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])
    const authorized = useMemo(() => memory?.author && (user._id === memory.author._id || user.role === 'admin'), [memory])
    const imageDims = useMemo(() => memory?.image && getMaxImageDims(memory.image.width, memory.image.height, 100), [memory])

    useEffect(() => {
        initMemory()
    }, [])
        
    const initMemory = async () => {
        
        setLoading(true)
        const result = await loadMemory(memoryId)
        setLoading(false)

        if (result) {
            updateMemory(result)
        } else {
            console.log('could not find or load memory data.')}
    }

    return memory && (
        <View
            {...props}
            style={{ gap: 5 }}
        >

            <Card.Title
                title={memory.author.username}
                titleVariant='titleMedium'
                subtitle={getTime(memory.createdAt, 'relative')}
                subtitleVariant='titleSmall'
                style={{ gap: 10, height: 'auto', minHeight: null }}
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
                        style={{ marginVertical: 0 }}
                    />
                )}
            />

            <Card.Content
                style={{
                    flex: 1,
                    paddingBottom: 15,
                    // gap: 15,
                    paddingRight: 0,
                    // borderWidth: 1,
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
                    
                    <View style={{ flex: 1, flexGrow: 1 }}>

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
                                    style={{ marginVertical: 0 }}
                                />
                            )}


                        </View>

                        <Text
                            variant='bodyLarge'
                            style={{ flex: 1, paddingRight: 15 }}
                        >
                            {memory.body}
                        </Text>

                    </View>

                </View>
                    
            </Card.Content>
        </View>
    )
}

const MemoryList = ({ ids, ...props }) => {

    const {
        // memories,
        updateMemory,
        deleteMemory,
    } = useMemory()

    const { closeModal, setModal } = useModal()
    const { socket } = useSocket()
    const { user } = useUser()

    // const [items, setItems] = useState(memories)
    const [loading, setLoading] = useState(false)

    const listRef = useRef()

    useEffect(() => {
        socket.on('new_memory', updateMemory)
        socket.on('deleted_memory', deleteMemory)
    }, [])

    // useEffect(() => {
    //     console.log('memories changed', memories)
    //     setItems(memories)
    // }, [memories])

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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 15 }}>
                <Text variant='titleLarge'>Memories</Text>
                <IconButton
                    icon='plus-thick'
                    onPress={() => setModal('MEMORY')}
                    size={30}
                    style={{ marginHorizontal: 3 }}
                />
            </View>

            <Card.Content style={{ flex: 1, padding: 0 }}>
                
                <FlatList
                    ref={listRef}
                    data={ids}
                    extraData={ids}
                    keyExtractor={item => `memory-${item}`}
                    renderItem={({ item }) => {
                        return (
                            <MemoryListItem
                                style={{ flex: 1 }}
                                memoryId={item}
                                navigation={props.navigation}
                                onDelete={removeMemory}
                            />
                        )
                    }}
                    ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 10 }} />}
                    // style={{ flex: 1 }}
                />

            </Card.Content>

        </Card>
    )
}

export default MemoryList