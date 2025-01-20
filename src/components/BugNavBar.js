import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconButton } from '@components'
import { useApp, useBugs } from '@context'
import { navigate } from '@utils/navigation'
import { useStyles } from '@styles'

const BugNavBar = ({ landscape, route }) => {

    const { theme } = useApp()
    const { setBugModal } = useBugs()
    const styles = useStyles(theme)

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
                    style={styles.navButtonFirst}
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
                
                <View style={styles.navButton}>
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