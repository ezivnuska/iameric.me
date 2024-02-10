import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import layout from '../styles/layout'

const CenteredContent = ({ children, type, ...props }) => {

    const {
        dims,
    } = useContext(AppContext)

    const styles = ({
        margin: {
            width: dims.window.width,
            maxWidth: 375,
            marginHorizontal: 'auto',
            paddingHorizontal: layout.horizontalPadding,
        },
        full: {
            width: dims.window.width,
            maxWidth: 375,
            marginHorizontal: 'auto',
        },
        expanded: {
            width: dims.window.width - layout.horizontalMargin,
            maxWidth: 375,
            marginHorizontal: 'auto',
        },
    })

    const getStyles = () => {
        switch(type) {
            case 'full': return styles.full; break
            case 'expanded': return styles.expanded; break
            default: return styles.margin
        }
    }

    return (
        <View style={[{ width: dims.window.width }, props.style]}>
            <View style={[
                getStyles(),
                // { borderWidth: 1 }
            ]}>
                {children}
            </View>
        </View>
    )
}

export default CenteredContent