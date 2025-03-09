import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { ImageLoader, SmartAvatar } from '@components'
import { useMemory, useModal, useSocket, useTheme, useUser } from '@context'
import { deleteMemoryWithId, loadMemories, loadMemory } from '@utils/memories'
import { getMaxImageDims } from '@utils/images'
import { getTime } from '@utils/time'

const MemoryListItem = ({ onDelete, memory, ...props }) => {
   
    const { updateMemory } = useMemory()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [memoryLoaded, setMemoryLoaded] = useState(false)
    const [maxDims, setMaxDims] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    const year = useMemo(() => memoryLoaded && memory?.year, [memory])
    const month = useMemo(() => memoryLoaded && memory?.month, [memory])
    const day = useMemo(() => memoryLoaded && memory?.day, [memory])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])
    const owned = useMemo(() => memory?.author && user._id === memory.author._id, [memory])
    const authorized = useMemo(() => (owned || user.role === 'admin'), [memory])

    useEffect(() => {
        initMemory()
    }, [])

    useEffect(() => {
        const image = memory?.image?.preview || memory?.image
        if (maxDims && image) setImageDims(getMaxImageDims(image.width, image.height, maxDims))
    }, [memory, maxDims])
        
    const initMemory = async () => {
        
        setLoading(true)
        result = await loadMemory(memory._id)
        setLoading(false)

        if (result) {
            updateMemory(result)
            setMemoryLoaded(true)
        } else {
            console.log('could not find or load memory data.')
        }
    }

    const shadow = {
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 1,
    }

    const onLayout = e => {
        
        setMaxDims({
            width: 200,
            height: 200,
        })
	}

    return memoryLoaded && (
        <View
            {...props}
            style={{ flex: 1 }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    paddingLeft: 15,
                    paddingRight: 5,
                    paddingTop: 7,
                    paddingBottom: 5,
                }}
            >
                <SmartAvatar
                    user={memory.author}
                    size={landscape ? 30 : 40}
                />
    
                <View
                    style={{
                        flex: 1,
                        flexDirection: landscape && 'row',
                        alignItems: landscape && 'center',
                        gap: (landscape && 15),
                    }}
                >
                    
                    <Text
                        variant='titleMedium'
                    >
                        {memory.author?.username}
                    </Text>
    
                    <Text
                        variant='titleMedium'
                        style={{ color: '#aaa' }}
                    >
                        {getTime(memory.createdAt, 'relative')}
                    </Text>
    
                </View>
    
                {authorized && (
                    <IconButton
                        icon='close-thick'
                        size={25}
                        onPress={onDelete}
                        style={{ margin: 0 }}
                    />
                )}
    
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: landscape ? 'row' : 'column',
                    justifyContent: (landscape && 'space-between'),
                    paddingVertical: 10,
                    paddingLeft: 15,
                    paddingRight: 5,
                    gap: landscape ? 15 : 10,
                }}
            >
                {memory?.image && (
                    <View
                        onLayout={onLayout}
                    >
                        {imageDims && (
                            <Pressable
                                onPress={() => addModal('SHOWCASE', memory.image)}
                                disabled={memory.image.uri}
                                style={[{
                                    width: imageDims.width,
                                    height: imageDims.height,
                                }, shadow]}
                            >
                                <ImageLoader
                                    image={memory.image}
                                    user={memory.author}
                                    memoryId={memory._id}
                                />
                                
                            </Pressable>
                        )}
                    </View>
                )}
                    
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            gap: 10,
                        }}
                    >
                        {date && (
                            <Text variant='titleMedium'>
                                {date.toDateString()}
                            </Text>
                        )}

                        <Text
                            variant='bodyLarge'
                            style={{ flex: 1, paddingRight: 15 }}
                        >
                            {memory.body}
                        </Text>

                    </View>

                    {owned && (
                        <View>
                            <IconButton
                                icon='comment-edit-outline'
                                onPress={() => addModal('MEMORY', memory)}
                                style={{ margin: 0 }}
                            />

                            {!memory?.image && (
                                <IconButton
                                    icon='file-image-plus-outline'
                                    onPress={() => addModal('MEMORY_IMAGE', memory)}
                                    style={{ margin: 0 }}
                                />
                            )}
                        </View>
                    )}
                </View>

            </View>
                    
        </View>
    )
}

const MemoryList = props => {

    const {
        memories,
        updateMemory,
        setMemories,
        deleteMemory,
    } = useMemory()

    const { modal, closeModal, addModal } = useModal()
    const { socket } = useSocket()

    const listRef = useRef()
    
    const initMemories = async () => {

        const loadedMemories = await loadMemories()

        if (loadedMemories) {
            setMemories(loadedMemories)
        }
    }

    useEffect(() => {
        socket.on('new_memory', memory => {
            console.log(' socket heard new memory', memory)
            updateMemory(memory)
        })
        socket.on('deleted_memory', deleteMemory)
        initMemories()
    }, [])

    const removeMemory = async id => {
        
        await deleteMemoryWithId(id)

        socket.emit('memory_deleted', id)

        deleteMemory(id)

        if (modal) closeModal()
        
    }
    
    return (
        <Card
            elevation={0}
            style={{ flex: 1 }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 15,
                }}
            >
                <Text variant='titleLarge'>Memories</Text>

                <IconButton
                    icon='plus-thick'
                    onPress={() => addModal('MEMORY')}
                    size={25}
                    style={{ margin: 0, marginHorizontal: 3 }}
                />

            </View>

            <View style={{ flex: 1, padding: 0 }}>
                
                <FlatList
                    ref={listRef}
                    data={memories}
                    extraData={memories}
                    keyExtractor={(item, index) => `memory-${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <MemoryListItem
                            memory={item}
                            onDelete={() => removeMemory(item._id)}
                            style={{ flex: 1 }}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted }) => <Divider />}
                />

            </View>

        </Card>
    )
}

export default MemoryList