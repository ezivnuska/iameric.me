import React from 'react'
import { FlatList, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { CommentView, FeedItem } from './components'
import { AddImageButton, Row, Stack } from '@components'
import { useFeed, useModal, useUser } from '@context'
import { addPostImage, removePostImage } from '@utils/feed'
import { Size } from '@utils/stack'

const Feed = ({ posts, onDelete, ...props }) => {

    const { addModal } = useModal()
    const { updatePost } = useFeed()
    const { user } = useUser()

    const onUploaded = async (image, post) => {
        const postWithImage = await addPostImage(post._id, image._id)
        updatePost(postWithImage)
    }

    const onDeleteImage = async post => {
        const removedPost = await removePostImage(post._id)
        if (removedPost) updatePost(removedPost)
    }

    return (
        <Stack
            spacing={Size.M}
            style={{ flex: 1 }}
        >

            <Row
                padding={[Size.None, Size.XS, Size.None, Size.M]}
                align='center'
            >
                <View style={{ flex: 1 }}>
                    <Text variant='headlineSmall'>Feed</Text>
                </View>

                <IconButton
                    icon='plus-thick'
                    onPress={() => addModal('FEEDBACK')}
                    size={25}
                    style={{ margin: 0 }}
                />
            </Row>
                
            {posts && (
                <FlatList
                    data={posts}
                    extraData={posts}
                    keyExtractor={(item, index) => `post-${item._id}-${index}`}
                    renderItem={({ item }) => (
                        <FeedItem
                            post={item}
                            onDelete={onDelete}
                        />
                    )}
                    ItemSeparatorComponent={({ highlighted, leadingItem }) => (
                        <Stack
                            spacing={Size.S}
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                paddingBottom: Size.S,
                                marginBottom: Size.S,
                            }}
                        >

                            <Row
                                padding={[Size.None, Size.XS, Size.None, Size.M]}
                            >

                                <View style={{ flex: 1 }}>
                                    <IconButton
                                        icon='comment-plus'
                                        onPress={() => addModal('COMMENT', { author: user._id, threadId: leadingItem._id })}
                                        style={{ margin: 0 }}
                                    />
                                </View>

                                {user._id === leadingItem.author._id && (
                                    <>

                                        {leadingItem?.image ? (
                                            <IconButton
                                                icon='file-image-minus'
                                                onPress={() => onDeleteImage(leadingItem)}
                                                style={{ margin: 0 }}
                                            />
                                        ) : (
                                            <AddImageButton
                                                onSelection={({ uri, height, width }) => updatePost({
                                                    ...leadingItem,
                                                    image: { uri, height, width },
                                                })}
                                                onUploaded={image => onUploaded(image, leadingItem)}
                                            />
                                        )}
                                    </>
                                )}

                            </Row>

                            {(leadingItem.comments?.length > 0) && (
                                <FlatList
                                    data={leadingItem.comments}
                                    extraData={leadingItem.comments}
                                    style={{ marginLeft: 20 }}
                                    keyExtractor={(item, index) => `comment-${item._id}-${index}`}
                                    renderItem={({ item }) => (
                                        <CommentView
                                            post={item}
                                            onDelete={() => onDelete(item)}
                                        />
                                    )}
                                />
                            )}
                        </Stack>
                    )}
                />
            )}

        </Stack>
    )
}

export default Feed