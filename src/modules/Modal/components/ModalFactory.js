import React from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    AuthForm,
    CaptionForm,
    DestroyForm,
    FeedbackForm,
    ImageForm,
    MessageForm,
    SettingsForm,
} from '@forms'
import { useApp } from '@app'
import { useModal } from '@modal'
import {
    BipDetail,
    CameraView,
    ImageDisplay,
    SocketDisplay,
    QuickStart,
} from '.'

export default () => {

    const { dims } = useApp()
    const { modal } = useModal()
    
    const renderModalContent = () => {
        const { type, data } = modal
        switch(type) {
            case 'AUTH': return <AuthForm />; break
            case 'CAPTION': return <CaptionForm data={data} />; break
            case 'CAPTURE': return <CameraView />; break
            case 'BIP': return <BipDetail data={data} />; break
            case 'DESTROY': return <DestroyForm />; break
            case 'FEEDBACK': return <FeedbackForm data={data} />; break
            case 'IMAGE': return <ImageForm data={data} />; break
            case 'MESSAGE': return <MessageForm data={data} />; break
            case 'SETTINGS': return <SettingsForm />; break
            case 'SHOWCASE': return <ImageDisplay data={data} />; break
            case 'SOCKETS': return <SocketDisplay />; break
            case 'QUICK': return <QuickStart />; break
            default: return null
        }
    }
    
    return modal ? (
        <View
            style={{
                flexBasis: 'auto',
                flexGrow: 0,
                flexShrink: 1,
                backgroundColor: '#fff',
                borderRadius: 20,
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
                overflow: 'hidden',
                paddingHorizontal: 10,
                paddingVertical: 10,
                maxHeight: dims.height - 100,
                width: dims.width - 10,
                maxWidth: 390,
                marginHorizontal: 'auto',
                zIndex: 100,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    maxWidth: 400,
                    marginHorizontal: 'auto',
                }}
            >
                {renderModalContent()}
            </ScrollView>
        </View>
    ) : null
}