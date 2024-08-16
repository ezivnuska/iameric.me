import React, { useEffect, useState } from 'react'
import {
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import {
    BipList,
    // PreviewList,
} from './components'
import {
    Heading,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
import {
    handleImageData,
    openCamera,
    uploadBipImage,
} from '@utils/images'
import {
    createBip,
} from '@utils/bips'
import EXIF from 'exif-js'
import Icon from 'react-native-vector-icons/Ionicons'

export default () => {

    const { bips } = useBips()
    const { setModal } = useModal()

    const [ loading, setLoading ] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
            >
                {bips.length > 0 && (
                    <BipList bips={bips} />
                )}
            </ScrollView>

            <View
                style={{
                    flexGrow: 0,
                    paddingVertical: 10,
                }}
            >
                <BigRoundButton
                    disabled={loading}
                    onPress={() => setModal('CAPTURE')}
                />
            </View>
            
        </View>
    )
}

const BigRoundButton = ({ disabled, onPress }) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: 100,
            borderRadius: 50,
            background: disabled ? '#ccc' : 'tomato',
            textAlign: 'center',
            marginHorizontal: 'auto',
        }}
    >
        <Icon
            name='camera-sharp'
            size={50}
            color={'#fff'}
            style={{ paddingBottom: 5 }}
        />
    </Pressable>
)