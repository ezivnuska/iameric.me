import React from 'react'
import {
    // ScrollView,
    View,
} from 'react-native'
import {
    ImageLoader,
    SocketDisplay,
} from '@components'
import FormFactory from '@form'
import {
    // AuthForm,
    // CaptionForm,
    // // DestroyForm,
    // FeedbackForm,
    // ImageForm,
    // MessageForm,
    // PostForm,
    SettingsForm,
} from '@forms'
// import { useApp } from '@app'
// import { useModal } from '@modal'
import {
    BipDetail,
    CameraView,
} from '.'

const ModalFactory = ({ modal }) => {

    const { type, data } = modal

    console.log('ModalFactory:type/data', type, data)

    // const { dims } = useApp()
    // const { modal } = useModal()
    // console.log('type FORM', type)
    
    const renderModalContent = () => {
        switch(type) {
            // case 'AUTH': return <AuthForm />; break
            // case 'CAPTION': return <CaptionForm data={data} />; break
            // case 'CAPTURE': return <CameraView />; break
            // case 'BIP': return <BipDetail data={data} />; break
                // case 'DESTROY': return <DestroyForm />; break
                // case 'POST': return <PostForm data={data} />; break
                // case 'FEEDBACK': return <FeedbackForm data={data} />; break
            // case 'IMAGE': return <ImageForm data={data} />; break
            // case 'MESSAGE': return <MessageForm data={data} />; break
            case 'SETTINGS': return <SettingsForm />; break
            // case 'SHOWCASE': return <ImageLoader data={data} />; break
            case 'SOCKETS': return <SocketDisplay />; break
            default: return <FormFactory modal={modal} />
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