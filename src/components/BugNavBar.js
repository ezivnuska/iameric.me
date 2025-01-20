import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy, IconButton } from '@components'
import { useApp, useBugs } from '@context'
import { navigate } from '@utils/navigation'

const BugNavBar = ({ landscape, route, size = 20 }) => {

    const { theme } = useApp()
    const { setBugModal } = useBugs()

    return (
        <View
            style={{
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingRight: 10,
                gap: 10,
            }}
        >
            <View
                style={{
                    flexGrow: landscape ? 0 : 1,
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
                        color={theme.colors.textDefault}
                        
                    >
                        Bugs
                    </TextCopy>
                </View>
                
            </View>


            <IconButton
                name='create-outline'
                onPress={() => setBugModal('BUG')}
                size={28}
                color='tomato'
                transparent
            />
            
        </View>
    )
}
export default BugNavBar