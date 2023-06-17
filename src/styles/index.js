import {
    Dimensions,
	Platform,
    StyleSheet,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    text: {
        fontHeight: 20,
		lineHeight: 24,
    },
})