import { StyleSheet } from 'react-native'
import { palette, text } from '.'
import { dark, light } from './themes'

export default getTheme = theme => {
    console.log('getTheme', theme)
    // const { colors, layout } = theme
    return theme.dark ? dark : light
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
        centerContainer: {
            flex: 1,
            width: '90%',
            minWidth: 300,
            // maxWidth: 600,
            marginHorizontal: 'auto',
            // paddingHorizontal: 10,
        },
        fullContainer: {
            flex: 1,
            width: '90%',
            minWidth: 300,
            // maxWidth: 600,
            marginHorizontal: 'auto',
        },
        city: {
            fontSize: 18,
            lineHeight: 23,
            color: colors.gray,
        },
        copy: {
            flex: 1,
            justifyContent: 'stretch',
            flexWrap: 'wrap',
            // flexShrink: 1,
            color: colors.text.primary,
            fontWeight: 400,
            fontSize: text.copy,
            lineHeight: text.copy + 5,
        },
        flexRow: {
            // width: '100%',
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
            // gap: 10,
        },
        flexGap10: {
            gap: 10,
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
        paddedVerticalLess: {
            paddingVertical: 5,
        },
        paddedVertical: {
            paddingVertical: 10,
        },
        paddedVerticalExtra: {
            paddingVertical: 20,
        },
        shadow: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 3,
        },
        text: {
            flexShrink: 1,
            fontSize: 16,
            fontWeight: 400,
            color: colors.text.primary,
            lineHeight: 20,
        },
        textCenter: {
            textAlign: 'center',
        },
        time: {
            fontSize: 18,
            lineHeight: 23,
            color: colors.gray,
        },
        navBar: {
            background: '#eee',
            marginRight: 10,
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