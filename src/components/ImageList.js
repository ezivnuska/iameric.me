import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import {
    ImageDisplay,
} from './'

const ImageList = ({ deleteImage, setAvatar, images, user }) => (
    <View style={styles.container}>
        {images ? (
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
        ) : <ActivityIndicator size='small' />}
    </View>
)

export default ImageList

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 'auto',
        paddingHorizontal: 10,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        flexBasis: 'auto',
        flexShrink: 0,
        flexGrow: 0,
        marginHorizontal: 2,
        marginBottom: 10,
    }
})