import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Card, Divider, IconButton, MD3Colors, Text } from 'react-native-paper'
import { Time, SmartAvatar } from '@components'
import { useBugs, useModal, useSocket, useTheme, useUser } from '@context'
import { deleteEntryWithId } from '@utils/bugs'

const Bugs = ({ navigation }) => {

    const {
        // bugModal,
        bugs,
        bugsLoading,
        updateBug,
        // closeBugModal,
        deleteBug,
        setBugsLoading,
    } = useBugs()

    const {
        closeModal,
        addModal,
    } = useModal()

    const { socket } = useSocket()
    // const { styles } = useTheme()
    const { user } = useUser()

    useEffect(() => {

        socket.on('new_entry', updateBug)
        socket.on('deleted_entry', deleteBug)
    }, [])

    const removeBug = async id => {

        setBugsLoading(true)
        await deleteEntryWithId(id)
        setBugsLoading(false)
        
        deleteBug(id)
        
        socket.emit('entry_deleted', id)
        
        closeModal()
    }
    
    return (
        <View style={{ flex: 1 }}>
        
            <Card.Title
                title='Bugs'
                titleVariant='titleLarge'
                // left={() => <IconButton icon='home' onPress={() => navigation.navigate('Home')} />}
                right={() => <IconButton icon='plus-thick' onPress={() => addModal('BUG')} size={30} />}
                style={{ padding: 0, marginLeft: 15 }}
            />

            <Card.Content style={{ padding: 0 }}>

                {bugs?.length ? (
                    <FlatList
                        data={bugs}
                        extraData={bugs}
                        keyExtractor={item => `bug-item-${item._id}`}
                        renderItem={({ item }) => {
                            const authorized = item && (user._id === item.author?._id || user.role === 'admin')
                            return (
                                <View
                                    style={{ paddingBottom: 20, paddingTop: 5 }}
                                >
                                    
                                    <Card.Title
                                        title={item.author.username}
                                        titleVariant='titleMedium'
                                        subtitle={<Time time={item.createdAt} />}
                                        style={{ gap: 10 }}
                                        left={() => <SmartAvatar user={item.author} />}
                                        right={() => authorized && (
                                            <IconButton 
                                                icon='delete-circle'
                                                onPress={() => removeBug(item._id)}
                                                disabled={bugsLoading}
                                                iconColor={MD3Colors.error50}
                                                size={30}
                                            />
                                        )}
                                    />
                        
                                    <Card.Content>
                                        <Text variant='bodyLarge'>{item.text}</Text>
                                    </Card.Content>
                                </View>
                            )
                        }}
                        ItemSeparatorComponent={({ highlighted }) => <Divider />}
                        style={{ flex: 1 }}
                    />
                ) : (
                    <Text
                        variant='bodyLarge'
                        style={{ paddingHorizontal: 15 }}
                    >
                        No bugs to squash.
                    </Text>
                )}

            </Card.Content>

        </View>
    )
    // return (
    //     <View style={{ flex: 1 }}>

    //         {bugs?.length ? (
    //             <FlatList
    //                 data={bugs}
    //                 extraData={bugs}
    //                 keyExtractor={item => `bug-item-${item._id}`}
    //                 renderItem={({ item }) => <BugListItem item={item} onDelete={removeBug} />}
    //                 ItemSeparatorComponent={({ highlighted }) => <Divider />}
    //                 style={{ flex: 1 }}
    //             />
    //         ) : (
    //             <Text variant='bodyLarge'>
    //                 No bugs to squash.
    //             </Text>
    //         )}

    //         <BugModal
    //             modal={bugModal}
    //             onClose={closeBugModal}
    //         />
                
    //     </View>
    // )
}

export default Bugs