import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { AddImageButton, ImageLoader, NavBar, SmartAvatar } from '@components'
import { useMemory, useModal, useTheme, useUser } from '@context'
import { addMemoryImage, removeMemoryImage } from '@utils/memories'
import { getTime } from '@utils/time'

const MemoryListItem = ({ memory, onDelete, ...props }) => {
   
    const { updateMemory } = useMemory()
    const { addModal } = useModal()
    const { landscape } = useTheme()
    const { user } = useUser()

    const year = useMemo(() => memory && memory.year, [memory])
    const month = useMemo(() => memory && memory.month, [memory])
    const day = useMemo(() => memory && memory.day, [memory])
    const date = useMemo(() => (year && month && day) && new Date(year, month, day), [year, month, day])
    const owned = useMemo(() => memory && user._id === memory.author._id, [memory])
    const authorized = useMemo(() => (owned || user.role === 'admin'), [memory])

    const onUploaded = async image => {
        const memoryWithImage = await addMemoryImage(memory._id, image._id)
        updateMemory(memoryWithImage)
    }
    
    const onDeleteImage = async () => {
        const updatedMemory = await removeMemoryImage(memory._id)
        if (updatedMemory) updateMemory(updatedMemory)
    }

    const isPortrait = useMemo(() => memory?.image && memory.image.height >= memory.image.width, [memory])
    const { width, height } = useMemo(() => {
        if (landscape && isPortrait) return { width: '40%', height: 240 }
        if (landscape && !isPortrait) return { width: '40%', height: 200 }
        if (!landscape && isPortrait) return { width: '100%', height: 280 }
        if (!landscape && !isPortrait) return { width: '100%', height: 180 }
    },[landscape])

    return memory && (
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
                    
                    <Text variant='titleMedium'>
                        {memory.author.username}
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
                        icon='delete-forever'
                        onPress={() => onDelete(memory._id)}
                        size={25}
                    />
                )}
    
            </View>

            <View
                style={{
                    flexDirection: (memory?.image && landscape) ? 'row' : 'column',
                }}
            >
                {memory.image && (
                    <View
                        style={{
                            height,
                            width,
                            marginBottom: 10,
                        }}
                    >
                        <ImageLoader
                            image={memory.image}
                            user={memory.author}
                        />
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
                            paddingLeft: 15,
                            paddingBottom: 20,
                        }}
                    >
                        {date && (
                            <Text variant='titleMedium'>
                                {date.toDateString()}
                            </Text>
                        )}

                        <Text
                            variant='bodyLarge'
                            style={{
                                flex: 1,
                                paddingRight: 15,
                            }}
                        >
                            {memory.body}
                        </Text>

                    </View>

                    {owned && (
                        <View>
                            <IconButton
                                icon='comment-edit-outline'
                                onPress={() => addModal('MEMORY', memory)}
                            />

                            {memory?.image ? (
                                <IconButton
                                    icon='file-image-minus'
                                    onPress={onDeleteImage}
                                />
                            ) : (
                                <AddImageButton
                                    onSelection={({ uri, height, width }) => updateMemory({
                                        ...memory,
                                        image: { uri, height, width },
                                    })}
                                    onUploaded={onUploaded}
                                />
                            )}
                        </View>
                    )}
                </View>

            </View>
                    
        </View>
    )
}

const MemoryList = ({ memories, onDelete, ...props }) => {
    
    return (
        <View style={{ flex: 1 }}>
        
            <NavBar {...props} />
            
            {memories && (
                <FlatList
                    data={memories}
                    extraData={memories}
                    keyExtractor={(item, index) => `memory-${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <MemoryListItem
                            memory={item}
                            onDelete={() => onDelete(item._id)}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted }) => <Divider />}
                />
            )}

        </View>
    )
}

export default MemoryList