import { StyleSheet } from 'react-native'
import { palette, text } from '.'

export const getStyles = theme => {
    const { colors } = theme
    const styles = StyleSheet.create({
        bold: {
            fontWeight: 700,
        },
        border: {
            borderWidth: 1,
            borderColor: colors.border,
        },
        brand: {
            fontSize: 30,
            fontWeight: 700,
            color: colors.brand.primary,
        },
        brandAlt: {
            fontSize: 30,
            fontWeight: 700,
            color: colors.brand.secondary,
        },
        buttonLabel: {
            fontSize: 18,
            color: colors.button.text,
            fontWeight: 700,
        },
        city: {
            fontSize: 18,
            lineHeight: 23,
            color: colors.gray,
        },
        copy: {
            flexWrap: 'wrap',
            flexShrink: 1,
            color: colors.text.primary,
            fontWeight: 400,
            fontSize: text.copy,
            lineHeight: text.copy + 5,
        },
        flexRow: {
            // width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            // gap: 10,
        },
        justifyCenter: {
            justifyContent: 'center',
        },
        justifyBetween: {
            justifyContent: 'space-between',
        },
        flexDominant: {
            flexGrow: 1,
        },
        flexSubmissive: {
            flexGrow: 0,
        },
        heading: {
            color: colors.text.secondary,
            fontSize: text.heading,
            fontWeight: 700,
            lineHeight: text.heading + 5,
        },
        link: {
            color: colors.text.link,
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
            color: colors.text.primary,
        },
        time: {
            fontSize: 18,
            lineHeight: 23,
            color: colors.gray,
        },
        navButton: {
            paddingRight: 10,
            marginRight: 10,
        },
        navLink: {
            color: colors.nav.link,
            fontSize: text.heading,
            fontWeight: 700,
            lineHeight: text.heading + 5,
        },
        navLinkDisabled: {
            color: colors.nav.disabled,
        },
        navLinkFirst: {
            paddingRight: 10,
            borderRightWidth: 1,
            borderRightColor: colors.border,
            marginRight: 10,
        },
        navLinkMiddle: {
            paddingRight: 10,
        },
        navLinkLast: {
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
        },
    })

    return styles
}