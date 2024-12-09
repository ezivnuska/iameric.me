import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText, IconButton } from '@components'
import { useFeed } from '@context'
import { navigate } from '@utils/navigation'

const FeedNavBar = ({ route, ...props }) => {

    const { setFeedModal } = useFeed()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                gap: 10,
                ...props.style,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    onPress={() => navigate('Home')}
                    disabled={route.name === 'Home'}
                    style={{ paddingRight: 10 }}
                >
                    <DefaultText
                        size={24}
                        color={route.name !== 'Home' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        bold
                    >
                        Home
                    </DefaultText>

                </Pressable>
                
                <View
                    style={{
                        paddingHorizontal: 10,
                        borderLeftWidth: 1,
                        borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <DefaultText
                        size={24}
                        bold
                        color='rgba(0, 0, 0, 0.75)'
                        
                    >
                        Feed
                    </DefaultText>
                </View>
            </View>


            <IconButton
                name='create-outline'
                onPress={() => setFeedModal('FEEDBACK')}
                size={28}
                color='tomato'
                transparent
            />
            
        </View>
    )
}
export default FeedNavBar