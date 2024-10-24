import React from 'react'
import { View } from 'react-native'
import {
    AuthForm,
    DestroyForm,
    FeedbackForm,
    // ImageDisplay,
    ImageForm,
    MessageForm,
} from './forms'

export default ({ type, data = null }) => {

    const renderForm = () => {
        switch(type) {
            case 'AUTH': return <AuthForm />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'FEEDBACK': return <FeedbackForm />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            case 'IMAGE': return <ImageForm data={data} />; break
            // case 'SHOWCASE': return <ImageDisplay data={data} />; break
            default: throw new Error('No form type recognized')
        }
    }

    return (
        <View
            style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
            }}
        >
            {renderForm()}
        </View>
    )
}