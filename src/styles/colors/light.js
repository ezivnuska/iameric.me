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

export default light = {
    dark: false,
    colors: {
        background: white,
        border: gray,
        brand: {
            primary: black,
            secondary: orange,
        },
        button: {
            background: orange,
            text: white,
            active: {
                text: white,
                background: purple,
            },
            disabled: {
                text: white,
                background: gray,
            },
        },
        nav: {
            text: black,
            link: orange,
            disabled: black,
        },
        text: {
            primary: black,
            secondary: gray,
            link: orange,
        },



        backButtonLabel: '#000',
        // background: '#fff',
        backgroundTransparent: '#fffff00',
        // border: '#aaa',
        buttonText: '#fff',
        buttonDefault: '#00a',
        buttonPrimary: '#e97451',
        buttonLabel: '#000',
        buttonPrimaryLabel: '#fff',
        buttonSecondary: '#aaf',
        buttonDanger: '#f00',
        buttonDisabled: '#aaa',
        brandDark: '#aaa',
        brandLight: '#000',
        headerPrimary: '#333',
        headerSecondary: 'orange',
        screen: '#fff',
        screenTitleBackground: '#dddddd',
        shadow: '#000',
        tabActive: '#f00',
        tabInactive: '#000',
        tabBackground: '#fff',
        textDefault: '#555',
        textAlt: '#fff',
        userTitle: '#000',
        modalBackground: '#fff',
        inputLabel: '#000',
        inputText: 'tomato',
        inputTextFocused: '#000',
        inputBackground: '#fff',
        inputBackgroundFocused: '#fee',
        inputPlaceholderText: '#aaa',
        inputPlaceholderTextFocused: '#ccc',
        quantityBackground: '#000',
        quantityLabel: '#fff',
        statusOn: 'tomato',
        statusOff: '#000',
    },
}