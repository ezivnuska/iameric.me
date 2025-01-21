import palette from '../palette'

const {
    black,
    gray,
    purple,
    red,
    orange,
    orange50,
    white82,
    white
} = palette

export default dark = {
    dark: true,
    colors: {
        background: black,
        border: gray,
        brand: {
            primary: white,
            secondary: orange,
        },
        button: {
            background: orange,
            text: white,
            active: {
                text: white,
                background: orange,
            },
            disabled: {
                text: white,
                background: orange50,
            },
        },
        nav: {
            text: white,
            link: orange,
            disabled: white,
        },
        text: {
            primary: white,
            secondary: gray,
            link: orange,
        },



        backButtonLabel: '#fff',
        // background: '#000',
        backgroundTransparent: '#00000000',
        // border: '#aaa',
        buttonLabel: '#fff',
        buttonText: '#fff',
        buttonDefault: '#00a',
        buttonLabel: '#fff',
        buttonPrimary: '#e97451',
        buttonPrimaryLabel: '#fff',
        buttonSecondary: '#aaf',
        buttonDanger: '#f00',
        buttonDisabled: '#aaa',
        brandDark: '#aaa',
        brandLight: '#fff',
        headerPrimary: '#ddd',
        headerSecondary: 'yellow',
        screen: '#111',
        screenTitleBackground: '#333333',
        shadow: '#fff',
        tabActive: '#f00',
        tabInactive: '#fff',
        tabBackground: '#000',
        textDefault: '#fff',
        textAlt: '#000',
        userTitle: '#fff',
        modalBackground: '#000',
        inputLabel: '#fff',
        inputText: '#fff',
        inputTextFocused: '#000',
        inputBackground: '#000',
        inputBackgroundFocused: '#fff',
        inputPlaceholderText: '#333',
        inputPlaceholderTextFocused: '#333',
        quantityBackground: '#fff',
        quantityLabel: '#000',
        statusOn: '#afa',
        statusOff: '#fff',
    },
}