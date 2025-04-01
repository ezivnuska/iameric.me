import React from 'react'
import { FlatList, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { CommentView, FeedItem } from './components'
import { AddImageButton, Row, NavBar, Stack } from '@components'
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
        <View style={{ flex: 1 }}>

            <NavBar {...props} />
                
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
                                padding={[Size.None, Size.XS, Size.None, Size.S]}
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

        </View>
    )
}

export default Feed