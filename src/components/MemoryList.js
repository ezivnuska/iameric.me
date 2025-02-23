import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Image, Pressable, View } from 'react-native'
import { ActivityIndicator, Card, Divider, IconButton, Text } from 'react-native-paper'
import { SmartAvatar } from '@components'
import { useMemory, useModal, useSocket, useTheme, useUser } from '@context'
import { Paths } from '@constants'
import { addMemoryImage, deleteMemoryWithId, loadMemory } from '@utils/memories'
import { getMaxImageDims } from '@utils/images'
import { getTime } from '@utils/time'
import ImagePreview from './ImagePreview'

const MemoryListItem = ({ onDelete, navigation, memory, ...props }) => {
   
    const { findMemoryById, updateMemory } = useMemory()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { iam, user, getUser, findUserById } = useUser()

    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(null)
    const [maxDims, setMaxDims] = useState(null)
    const [imageDims, setImageDims] = useState(null)
    // const imageDims = useMemo(() => maxDims && item?.image && getMaxImageDims(item.image.width, item.image.height, maxDims), [maxDims])

    // const memory = useMemo(() => memories && findMemoryById(memoryId), [memories])
    const upload = useMemo(() => item && item.upload, [item])
    const author = useMemo(() => item && getUser(item.author._id), [item])
    const isMe = useMemo(() => author && author._id === user._id, [author])
    const previewDims = useMemo(() => upload && maxDims && getMaxImageDims(upload.preview.width, upload.preview.height, maxDims), [upload])
    const year = useMemo(() => memory?.year, [memory])
    const month = useMemo(() => memory?.month, [memory])
    const day = useMemo(() => memory?.day, [memory])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])
    const authorized = useMemo(() => author && (user._id === author._id || user.role === 'admin'), [author])

    useEffect(() => {
        // console.log('memory', memory)
        initMemory()
    }, [])

    useEffect(() => {
        // console.log('item', item)
        // console.log('maxDims', maxDims)
        if (maxDims && item?.image && maxDims) setImageDims(getMaxImageDims(item.image.width, item.image.height, maxDims))
    }, [item, maxDims])

    useEffect(() => {
        // console.log('image dims', imageDims)
    }, [imageDims])
        
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

    const onLayout = e => {
        
        setMaxDims({
            width: 200,
            // width: e.nativeEvent.target.clientWidth,
            height: 200,
            // height: e.nativeEvent.target.clientHeight,
        })
	}

    return author && (
        <View
            {...props}
            style={{ flex: 1, gap: 5 }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    paddingLeft: 15,
                    paddingTop: 7,
                    paddingBottom: 5,
                }}
            >
                <SmartAvatar
                    user={user}
                    size={landscape ? 30 : 40}
                />
    
                <View
                    style={{
                        flex: 1,
                        flexDirection: landscape ? 'row' : 'column',
                        alignItems: (landscape && 'center'),
                        gap: (landscape && 15),
                    }}
                >
                    
                    <Text
                        variant='titleMedium'
                    >
                        {user.username}
                    </Text>
    
                    <Text
                        variant='titleSmall'
                    >
                        {getTime(item.createdAt, 'relative')}
                    </Text>
    
                </View>
    
                <IconButton
                    icon='close-thick'
                    size={20}
                    onPress={() => onDelete(item._id)}
                    style={{
                        padding: 0,
                        margin: 0,
                    }}
                />
    
            </View>
            {/* <Card.Title
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
            /> */}

            {/* <Card.Content
                style={{
                    flex: 1,
                    paddingBottom: 15,
                    // gap: 15,
                    paddingRight: 0,
                    paddingLeft: 15,
                    // borderWidth: 1,
                }}
            > */}
                <View
                    // onLayout={onLayout}
                    style={{
                        flex: 1,
                        flexDirection: landscape ? 'row' : 'column',
                        justifyContent: (landscape && 'space-between'),
                        gap: 15,
                        paddingTop: 15,
                        paddingBottom: 15,
                        paddingHorizontal: 15,
                        // background: 'pink',
                    }}
                >

                    <View
                        onLayout={onLayout}
                        // style={{
                        //     // flex: 1,
                        //     // maxHeight: 200,
                        //     // maxWidth: 150,
                        // }}
                    >
                        {item?.image && imageDims && (
                            <Pressable
                                onPress={() => addModal('SHOWCASE', item.image)}
                                style={[{
                                    width: imageDims.width,
                                    height: imageDims.height,
                                }, shadow]}
                            >
                                <Image
                                    // onLayout={e => console.log({
                                    //     width: e.nativeEvent.target.clientWidth,
                                    //     height: e.nativeEvent.target.clientHeight,
                                    // })}
                                    source={`${Paths.ASSETS}/${item.author.username}/${item.image.filename}`}
                                    resizeMode='contain'
                                    style={{
                                        width: imageDims.width,
                                        height: imageDims.height,
                                    }}
                                />
                            </Pressable>
                        )}
                    </View>
                    
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

                                {!item?.image && (
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
                    
            {/* </Card.Content> */}
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