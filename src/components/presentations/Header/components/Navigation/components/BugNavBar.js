import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useModal } from '@context'
import { navigate } from '@utils/navigation'

const BugNavBar = ({ route }) => {

    const { setModal } = useModal()

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 50,
                gap: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    // gap: 10,
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
                        size={24}
                        color={route.name !== 'Home' ? 'tomato' : 'rgba(0, 0, 0, 0.75)'}
                        bold
                    >
                        Home
                    </TextCopy>

                </Pressable>
                
                <View style={{ paddingHorizontal: 10 }}>
                    <TextCopy
                        size={24}
                        bold
                        color='rgba(0, 0, 0, 0.75)'
                        
                    >
                        Bugs
                    </TextCopy>
                </View>
                
            </View>


            <IconButton
                name='create-outline'
                onPress={() => setModal('BUG')}
                size={28}
                color='tomato'
                transparent
            />
            
        </View>
    )
}
export default BugNavBar