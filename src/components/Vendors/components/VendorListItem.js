import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { useApp } from '@context'
import { classes } from '@styles'
import { ThunderboltOutlined } from '@ant-design/icons'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, onPress = null, ...props }) => {

    const { landscape, theme } = useApp()

    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (user && user.exp) {
            const newDate = new Date(user.exp) - Date.now()
            const expired = (newDate > 0)
            setOnline(!expired)
        }
    }, [user])
    
    const getSource = () => filename
        ? `${IMAGE_PATH}/${user.username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`

    return (
        <View
            style={[
                {
                    flexBasis: 'auto',
                    flexGrow: 1,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: landscape ? 'column' : 'row',
                    justifyContent: landscape ? 'center' : 'flex-start',
                    alignItems: landscape ? 'center' : 'baseline',
                    // gap: 12,
                    // borderWidth: 1,
                    // borderColor: 'green',
                    flexWrap: 'nowrap',
                    // paddingHorizontal: landscape ? 0 : 10,
                    paddingBottom: 10,
                },
                props.style,
            ]}
        >
            <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    width: 35,
                    height: 35,
                    resizeMode: 'stretch',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
                source={getSource()}
            />

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    // borderWidth: 1,
                    // borderColor: 'yellow',
                    marginTop: landscape ? 8 : 0,
                    marginLeft: landscape ? 0 : 10,
                }}
            >
                <Pressable
                    disabled={!onPress}
                    onPress={onPress}
                    // style={{ marginBottom: 8 }}
                >
                    <ThemedText
                        style={classes.userHeading}
                    >
                        {user.username}
                        {online && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                    </ThemedText>

                </Pressable>
                
                <View
                    style={{
                        flexBasis: '100%',
                        flexGrow: 0,
                    }}
                >
                    {children}
                </View>

            </View>

        </View>
    )
}