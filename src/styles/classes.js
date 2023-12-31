import colors from './colors'
import sizes from './sizes'

export default {
    pageTitle: {
        marginBottom: 15,
        fontSize: sizes.headerPrimary,
        fontWeight: 700,
        lineHeight: sizes.headerPrimary + 4,
        color: colors.headerPrimary,
    },
    headerSecondary: {
        marginBottom: 5,
        fontSize: sizes.headerSecondary,
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,
        color: colors.headerSecondary,
    },
    textDefault: {
        fontSize: sizes.textDefault,
        fontWeight: 300,
        lineHeight: sizes.textDefault + 8,
        color: colors.textDefault,
        letterSpacing: 0.5,
    },
    userHeading: {
        fontSize: sizes.userTitle,
        fontWeight: 700,
        lineHeight: 32,
        color: colors.userTitle,
    },
}