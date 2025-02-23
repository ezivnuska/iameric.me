import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { ActivityIndicator, Card, Divider, IconButton, Text } from 'react-native-paper'
import { SmartAvatar } from '@components'
import { useMemory, useModal, useSocket, useUser } from '@context'
import { Paths } from '@constants'
import { addMemoryImage, deleteMemoryWithId, loadMemory } from '@utils/memories'
import { getMaxImageDims } from '@utils/images'
import { getTime } from '@utils/time'
import ImagePreview from './ImagePreview'

const MemoryListItem = ({ onDelete, navigation, memory, ...props }) => {
   
    const { findMemoryById, updateMemory } = useMemory()
    const { addModal } = useModal()
    const { iam, user, getUser, findUserById } = useUser()

    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(null)

    // const memory = useMemo(() => memories && findMemoryById(memoryId), [memories])
    const upload = useMemo(() => item && item.upload, [item])
    const author = useMemo(() => item && getUser(item.author._id), [item])
    const isMe = useMemo(() => author && author._id === user._id, [author])
    const image = useMemo(() => item && item.image, [item])
    const imageDims = useMemo(() => image && getMaxImageDims(image.width, image.height, 100), [image])
    const previewDims = useMemo(() => upload && getMaxImageDims(upload.preview.width, upload.preview.height, 100), [upload])
    const year = useMemo(() => memory?.year, [memory])
    const month = useMemo(() => memory?.month, [memory])
    const day = useMemo(() => memory?.day, [memory])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])
    const authorized = useMemo(() => author && (user._id === author._id || user.role === 'admin'), [author])

    useEffect(() => {
        // console.log('memory', memory)
        initMemory()
    }, [])

    // useEffect(() => {
    //     if (memory) setItem(memory)
    // }, [memory])
        
    const initMemory = async () => {
        
        setLoading(true)
        result = await loadMemory(memory._id)
        setLoading(false)

        if (result) {
            // console.log('loaded memory', result)
            setItem(result)
            updateMemory(result)
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

    return author && (
        <View
            {...props}
            style={{ gap: 5 }}
        >

            <Card.Title
                title={author.username}
                titleVariant='titleMedium'
                subtitle={getTime(item.createdAt, 'relative')}
                subtitleVariant='titleSmall'
                style={{ gap: 10, height: 'auto', minHeight: null }}
                left={() => (
                    <SmartAvatar
                        user={isMe ? iam : author}
                        onPress={() => navigation.navigate('User', { screen: 'Profile', params: { username: author?.username } })}
                    />
                )}
                right={() => authorized && (
                    <IconButton
                        icon='delete-forever'
                        mode='contained'
                        onPress={() => onDelete(item._id)}
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
                        paddingTop: 15,
                    }}
                >

                        {previewDims && upload && (
                            <ImagePreview
                                preview={upload.preview}
                                width={previewDims.width}
                                height={previewDims.height}
                                uploading={upload}
                            />
                        )}

                        {imageDims && image && (
                            <Pressable
                                onPress={() => addModal('SHOWCASE', image)}
                                style={[{
                                    width: imageDims.width,
                                    height: imageDims.height,
                                }, shadow]}
                            >
                                <Image
                                    source={`${Paths.ASSETS}/${item.author.username}/${image.filename}`}
                                    resizeMode='contain'
                                    style={{
                                        // flex: 1,
                                        width: imageDims.width,
                                        height: imageDims.height,
                                    }}
                                />
                            </Pressable>
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
                                {item.body}
                            </Text>

                        </View>

                        {authorized && (
                            <View>
                                <IconButton
                                    icon='comment-edit-outline'
                                    onPress={() => addModal('MEMORY', item)}
                                    style={{ marginVertical: 0 }}
                                />

                                {image ? (
                                    <IconButton
                                        icon='file-image-remove-outline'
                                        onPress={() => console.log('TODO: remove image...')}
                                        style={{ marginVertical: 0 }}
                                    />
                                ) : (
                                    <IconButton
                                        icon='file-image-plus-outline'
                                        onPress={() => addModal('MEMORY_IMAGE', item)}
                                        style={{ marginVertical: 0 }}
                                    />
                                )}
                            </View>
                        )}
                    </View>

                </View>
                    
            </Card.Content>
        </View>
    )
}

const MemoryList = ({ memories, ...props }) => {

    const {
        updateMemory,
        deleteMemory,
        uploadData,
        setUploadData,
    } = useMemory()

    const { setUploading } = useUser()
    const { modal, closeModal, addModal } = useModal()
    const { socket } = useSocket()

    const listRef = useRef()

    useEffect(() => {
        socket.on('new_memory', memory => {
            console.log('new memory', memory)
            updateMemory(memory)
        })
        socket.on('deleted_memory', deleteMemory)
    }, [])

    const addImage = async upload => {
        const { imageData, thumbData, memoryId, preview } = upload
        setUploading(preview)
        updateMemory({
            _id: memoryId,
            upload,
        })
        const memory = await addMemoryImage(memoryId, { imageData, thumbData })
        // initUpload(imageUpload)
        if (memory) {
            updateMemory({
                ...memory,
                upload: null,
            })
            setUploadData(null)
            setUploading(null)
        }
    }

    useEffect(() => {
        if (uploadData) {
            addImage(uploadData)
        }
        
    }, [uploadData])

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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 15 }}>
                <Text variant='titleLarge'>Memories</Text>
                <IconButton
                    icon='plus-thick'
                    onPress={() => addModal('MEMORY')}
                    size={30}
                    style={{ marginHorizontal: 3 }}
                />
            </View>

            <Card.Content style={{ flex: 1, padding: 0 }}>
                
                <FlatList
                    ref={listRef}
                    data={memories}
                    extraData={memories}
                    keyExtractor={item => `memory-${item._id}`}
                    renderItem={({ item }) => {
                        return (
                            <MemoryListItem
                                style={{ flex: 1 }}
                                memory={item}
                                navigation={props.navigation}
                                onDelete={removeMemory}
                            />
                        )
                    }}
                    ItemSeparatorComponent={({ highlighted }) => <Divider style={{ marginBottom: 10 }} />}
                />

            </Card.Content>

        </Card>
    )
}

export default MemoryList