import React, { useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import layout from '../styles/layout'

const PanelView = ({ children, type, ...props }) => {

    const {
        dims,
    } = useContext(AppContext)

    const styles = ({
        margin: {
            width: dims.window.width - (layout.horizontalMargin * 2),
            maxWidth: 400,
            marginHorizontal: 'auto',
            backgroundColor: 'purple',
        },
        full: {
            width: dims.window.width,
            maxWidth: 400,
            marginHorizontal: 'auto',
            backgroundColor: 'blue',
        },
        expanded: {
            width: dims.window.width - layout.horizontalMargin,
            maxWidth: 400,
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
        <View style={[getStyles(), { borderWidth: 1 }, props.style]}>
            {children}
        </View>
    )
}

export default PanelView