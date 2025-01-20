import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconButton } from '@components'
import { useApp, useFeed } from '@context'
import { navigate } from '@utils/navigation'
import { useStyles } from '@styles'

const FeedNavBar = ({ landscape, route, size = 20 }) => {

    const { theme } = useApp()
    const { setFeedModal } = useFeed()
    const styles = useStyles(theme)

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
                    <Text
                        style={styles.heading}
                    >
                        Feed
                    </Text>
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