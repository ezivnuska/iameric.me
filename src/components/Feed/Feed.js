import React from 'react'
import { FlatList, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { FeedItem } from './components'
import { AddImageButton, NavBar } from '@components'
import { useFeed, useModal, useUser } from '@context'
import { addPostImage, removePostImage } from '@utils/feed'

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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                paddingLeft: 5,
                                paddingRight: 5,
                            }}
                        >

                            <View>
                                <IconButton
                                    icon='comment-plus'
                                    onPress={() => addModal('COMMENT', { author: user._id, threadId: leadingItem._id })}
                                    style={{ margin: 0 }}
                                />
                            </View>

                            {user._id === leadingItem.author._id && (
                                <View style={{ flexDirection: 'row' }}>

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
                                </View>
                            )}
                        </View>
                    )}
                />
            )}

        </View>
    )
}

export default Feed