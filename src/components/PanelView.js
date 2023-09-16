import React from 'react'
import {
    View,
} from 'react-native'
import layout from '../styles/layout'

const PanelView = ({ children, type, ...props }) => {

    const getStyles = () => {
        switch(type) {
            case 'full':
                return layout.full
            break
            case 'expanded':
                return layout.expanded
            break
            default:
                return layout.margin
        }
    }

    return (
        <View style={[getStyles(), props.style]}>
            {children}
        </View>
    )
}

export default PanelView