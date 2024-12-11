import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const FeedNavBar = ({ route }) => {

    const { setModal } = useModal()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: 10,
            }}
        >
            <Pressable
                onPress={() => navigate('Home')}
                disabled={route.name === 'Home'}
                style={{ paddingHorizontal: 10 }}
            >
                <TextCopy
                    size={24}
                    color={route.name !== 'Home' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                    bold
                >
                    Home
                </TextCopy>

            </Pressable>
            
            <View
                style={{
                    paddingHorizontal: 10,
                    borderLeftWidth: 1,
                    borderLeftColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <TextCopy
                    size={24}
                    bold
                    color='rgba(0, 0, 0, 0.75)'
                >
                    Feed
                </TextCopy>
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