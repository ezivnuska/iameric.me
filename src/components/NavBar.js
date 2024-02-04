import { Appbar } from 'react-native-paper'

export default ({ navigation, route, options, back }) => {
    const title = getHeaderTitle(options, route.name)
    
    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}