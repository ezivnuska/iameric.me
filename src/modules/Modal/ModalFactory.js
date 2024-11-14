import React from 'react'
import {
    View,
} from 'react-native'
import {
    Auth,
    Socket,
} from '@modules'
import FormFactory from '@form'
import {
    BipDetail,
    CameraView,
} from '.'

const ModalFactory = ({ modal }) => {

    const { type, data } = modal

    console.log('ModalFactory:type/data', type, data)
    
    const renderModalContent = () => {
        switch(type) {
            case 'SETTINGS': return <SettingsForm />; break
            case 'SOCKETS': return <Socket />; break
            case 'AUTH': return <Auth />; break
            default: return <FormFactory modal={modal} />
            // case 'AUTH': return <AuthForm />; break
            // case 'CAPTION': return <CaptionForm data={data} />; break
            // case 'CAPTURE': return <CameraView />; break
            // case 'BIP': return <BipDetail data={data} />; break
                // case 'DESTROY': return <DestroyForm />; break
                // case 'POST': return <PostForm data={data} />; break
                // case 'FEEDBACK': return <FeedbackForm data={data} />; break
            // case 'IMAGE': return <ImageForm data={data} />; break
            // case 'MESSAGE': return <MessageForm data={data} />; break
            // case 'SHOWCASE': return <ImageLoader data={data} />; break
        }
    }
    
    return (
        <View
            style={{
                flex: 1,
                paddingBottom: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            {renderModalContent()}
        </View>
    )
}

export default ModalFactory