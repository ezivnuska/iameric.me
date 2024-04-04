import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import { ThunderboltOutlined } from '@ant-design/icons'
import classes from '../styles/classes'
import { useApp } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ children, user, filename, horizontal = false, onPress = null, ...props }) => {

    const { theme } = useApp()

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
                    flexDirection: horizontal ? 'column' : 'row',
                    justifyContent: horizontal ? 'center' : 'flex-start',
                    alignItems: horizontal ? 'center' : 'baseline',
                    // gap: 12,
                    // borderWidth: 1,
                    // borderColor: 'green',
                    flexWrap: 'nowrap',
                    paddingHorizontal: horizontal ? 0 : 10,
                },
                props.style,
            ]}
        >
            <Image
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                    width: 50,
                    height: 50,
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
                    marginTop: horizontal ? 8 : 0,
                    marginLeft: !horizontal ? 10 : 0,
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