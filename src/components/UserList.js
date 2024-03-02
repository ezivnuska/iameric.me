import React from 'react'
import {
    FlatList,
    Image,
    Pressable,
    useWindowDimensions,
    ScrollView,
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import classes from '@styles/classes'
import { getProfileImagePathFromUser } from '@utils/images'

const ListItemVertical = ({ item, onPress, ...props }) => {
    const imagePath = getProfileImagePathFromUser(item)
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 15,
                paddingTop: 10,
            }}
            {...props}
        >
            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    source={imagePath}
                />
            </View>

            <Pressable
                onPress={() => onPress(item)}
                style={{
                    flex: 1,
                    glexGrow: 1,
                }}
            >
                <ThemedText
                    style={classes.userHeading}
                    align='left'
                >
                    {item.username}
                    {/* {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />} */}
                </ThemedText>

            </Pressable>
        </View>
    )
}

const ListItemHorizontal = ({ item, onPress, ...props }) => {
    const imagePath = getProfileImagePathFromUser(item)
    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                gap: 15,
                paddingVertical: 10,
                paddingHorizontal: 20,
            }}
            {...props}
        >
            <View
                style={{
                    // flexBasis: 'auto',
                    // flexGrow: 0,
                }}
            >
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={imagePath}
                />
            </View>

            <Pressable
                onPress={() => onPress(item)}
                style={{
                    // flex: 1,
                    // flexGrow: 1,
                }}
            >
                <ThemedText
                    style={classes.userHeading}
                    align='left'
                >
                    {item.username}
                    {/* {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />} */}
                </ThemedText>

            </Pressable>
        </View>
    )
}

export default ({ items, onPress, horizontal = false, ...props }) => {
    const dims = useWindowDimensions()
    return !horizontal ? (
        <FlatList
            data={items}
            listKey={() => 'users'}
            keyExtractor={(item, index) => 'user' + index}
            renderItem={({ item }) => (
                <ListItemVertical
                    item={item}
                    onPress={onPress}
                />)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 20,
            }}
        />
    ) : (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
                height: dims.height - 150,
                margin: 0,
            }}
            contentContainerStyle={{
                minHeight: dims.height - 150,
                width: '100%',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'nowrap',
                }}
            >
                {items.map(((item, index) => (
                    <ListItemHorizontal
                        item={item}
                        key={'user' + index}
                        onPress={onPress}
                    />
                )))}
            </View>
        </ScrollView>
    )
}