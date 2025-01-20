import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useApp, useFeed } from '@context'
import { navigate } from '@utils/navigation'

const FeedNavBar = ({ landscape, route, size = 20 }) => {

    const { theme } = useApp()
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
                        borderRightColor: '#aaa',
                    }}
                >
                    <TextCopy
                        size={size}
                        color={route.name !== 'Home' ? 'tomato' : theme.colors.textDefault}
                        bold
                    >
                        Home
                    </TextCopy>

                </Pressable>
                
                <View style={{ paddingHorizontal: 10 }}>
                    <TextCopy
                        size={size}
                        bold
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