
import { StyleSheet } from 'react-native'
import { palette, sizes } from '.'

export const useStyles = theme => {
    
    const styles = StyleSheet.create({
        bold: {
            fontWeight: 700,
        },
        buttonLabel: {
            fontSize: 18,
            color: '#fff',
            fontWeight: 700,
        },
        city: {
            fontSize: 18,
            lineHeight: 23,
            color: '#333',
        },
        copy: {
            flexWrap: 'wrap',
            flexShrink: 1,
            color: theme.colors.textDefault,
            fontWeight: 400,
            fontSize: sizes.copy,
            lineHeight: sizes.copy + 5,
        },
        flexRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        flexDominant: {
            flexGrow: 1,
        },
        flexSubmissive: {
            flexGrow: 0,
        },
        heading: {
            color: theme.colors.textDefault,
            fontSize: sizes.heading,
            fontWeight: 700,
            lineHeight: sizes.heading + 5,
        },
        link: {
            color: palette.pressable,
        },
        padded: {
            paddingHorizontal: 10,
            paddingVertical: 10,
        },
        paddedHorizontal: {
            paddingHorizontal: 10,
        },
        paddedVertical: {
            paddingVertical: 10,
        },
        text: {
            flexShrink: 1,
            fontWeight: 400,
            color: theme.colors.textDefault,
        },
        time: {
            fontSize: 18,
            lineHeight: 23,
            color: '#333',
        },
        navButtonFirst: {
            paddingRight: 10,
            borderRightWidth: 1,
            borderRightColor: '#aaa',
            marginRight: 10,
        },
        navButton: {
            paddingRight: 10,
        },
        navButtonLast: {
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: '#aaa',
        },
    })

    return styles
}