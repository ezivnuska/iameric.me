import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconButton } from '@components'
import { useBugs, useTheme } from '@context'
import { navigate } from '@utils/navigation'

const BugNavBar = ({ landscape, route }) => {

    const { styles } = useTheme()
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
                    style={styles.navLinkFirst}
                >
                    <Text
                        style={[
                            styles.heading,
                            route.name !== 'Home' ? styles.link : null,
                        ]}
                    >
                        Home
                    </Text>

                </Pressable>
                
                <View style={styles.navLink}>
                    <Text style={styles.heading}>
                        Bugs
                    </Text>
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