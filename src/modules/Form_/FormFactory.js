import React from 'react'
import {
    // ScrollView,
    View,
} from 'react-native'
// import {
//     SocketDisplay,
// } from '@components'
import {
    // AuthForm,
    // CaptionForm,
    ImageForm,
    MessageForm,
    // SettingsForm,
} from './forms_old'
import {
    BipDetail,
    CameraView,
} from '.'

const FormFactory = ({ modal }) => {
    
    const renderFormContent = () => {
        const { type, data } = modal
        console.log('FormFactory', type, data)
        switch(type) {
            // case 'AUTH': return <AuthForm />; break
            // case 'CAPTION': return <CaptionForm data={data} />; break
            case 'CAPTURE': return <CameraView />; break
            case 'BIP': return <BipDetail data={data} />; break
            case 'IMAGE': return <ImageForm data={data} />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            // case 'DESTROY': return <DestroyForm />; break
            // case 'POST': return <PostForm data={data} />; break
            // case 'FEEDBACK': return <FeedbackForm data={data} />; break
            // case 'SETTINGS': return <SettingsForm />; break
            // case 'SHOWCASE': return <ImageLoader data={data} />; break
            // case 'SOCKETS': return <SocketDisplay />; break
            default: return null
        }
    }
    
    return renderFormContent()
    return (
        <View
            style={{
                flex: 1,
                paddingBottom: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            {renderFormContent()}
        </View>
    )
}

export default FormFactory