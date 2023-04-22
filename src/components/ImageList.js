import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import {
    ImageDisplay,
} from './'

const ImageList = ({ deleteImage, setAvatar, images, user }) => (
    <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.list}
            data={images}
            keyExtractor={(filename, index) => `${filename}${index}`}
            numColumns={3}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <ImageDisplay
                        path={`${user.username}/${item.filename}`}
                        deleteImage={() => deleteImage(item._id, item.filename)}
                        setAvatar={() => setAvatar(user._id, item.filename)}
                    />
                </View>
            )}
        />
    </View>
)

export default ImageList

const styles = StyleSheet.create({
    container: {

    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        justifyContent: 'flex-start',
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
    }
})