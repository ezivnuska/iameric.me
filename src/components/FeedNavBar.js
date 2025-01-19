import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useFeed } from '@context'
import { navigate } from '@utils/navigation'

const FeedNavBar = ({ landscape, route, size = 20 }) => {

    const { setFeedModal } = useFeed()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                }}
            >
                <Pressable
                    onPress={() => navigate('Home')}
                    disabled={route.name === 'Home'}
                    style={{
                        paddingRight: 10,
                        borderRightWidth: 1,
                        borderRightColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <TextCopy
                        size={size}
                        color={route.name !== 'Home' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        bold
                    >
                        Home
                    </TextCopy>

                </Pressable>
                
                <View style={{ paddingHorizontal: 10 }}>
                    <TextCopy
                        size={size}
                        bold
                        color='rgba(0, 0, 0, 0.75)'
                    >
                        Feed
                    </TextCopy>
                </View>
                
            </View>

            {!landscape && (
                <IconButton
                    name='create-outline'
                    onPress={() => setFeedModal('FEEDBACK')}
                    size={28}
                    color='tomato'
                    transparent
                />
            )}

        </View>
    )
}
export default FeedNavBar