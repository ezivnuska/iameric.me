import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const FeedNavBar = ({ landscape, route, size }) => {

    const { setModal } = useModal()

    return (
        <View
            style={{
                // flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingHorizontal: 10,
                gap: 10,
                // background: 'yellow',
            }}
        >

            <View
                style={{
                    // flexGrow: landscape ? 0 : 1,
                    flexDirection: 'row',
                    alignItems: 'center',
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

            <IconButton
                name='create-outline'
                onPress={() => setModal('FEEDBACK')}
                size={28}
                color='tomato'
                transparent
            />

        </View>
    )
}
export default FeedNavBar