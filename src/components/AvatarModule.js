import React, { useContext, useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import axios from 'axios'
import ReactAvatarEditor from 'react-avatar-editor'
import {
    CircleButton,
    FileSelector,
    Preview,
    StatusDisplay,
} from '.'
import {
    CloseCircleOutlined,
    ConsoleSqlOutlined,
    UpCircleOutlined,
} from '@ant-design/icons'
import EXIF from 'exif-js'
import { AppContext } from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import defaultStyles from '../styles/main'

const windowDimensions = Dimensions.get('window')
const screenDimensions = Dimensions.get('screen')

export default ({ onComplete }) => {

    const {
        state,
        dispatch,
        dims,
    } = useContext(AppContext)

    const { user } = state
    const [ size, setSize ] = useState(300)
    const [ preview, setPreview ] = useState(null)
    const [ error, setError ] = useState('')
    const [ optimizing, setOptimizing ] = useState(false)
    const [ optimized, setOptimized ] = useState(false)
    const [ updated, setUpdated ] = useState(false)
    const [ uploading, setUploading ] = useState(false)

    useEffect(() => {
        if (dims) {
            const dropzone = document.getElementById('avatar-dropzone-wrapper')
            if (dropzone) {
                const maxWidth = size || 350
                const actualWidth = dropzone.offsetWidth
                setSize(actualWidth > maxWidth ? maxWidth : actualWidth)
            }
        }
    }, [dims])

    const [ editor, setEditor ] = useState(null)

    useEffect(() => {
        if (updated) {
            setUpdated(false)
            resetEditor()
        }
    }, [user])


    const resetEditor = () => {
        setPreview(null)
    }

    const handleSubmit = () => {
        if (editor) {
            const canvas = editor.getImage()
            const dataURL = canvas.toDataURL('image/png;base64;')
            optimizeImage(dataURL)
        }
    }
    
    const optimizeImage = src => {
        setOptimizing(true)
        setOptimized(false)
        const MAX_SIZE = 100
        const image = new Image()
        
        image.onload = async () => {
    
            const canvas = document.createElement('canvas')
        
            if (image.height > MAX_SIZE) {
                image.width *= MAX_SIZE / image.height
                image.height = MAX_SIZE
            }
        
            if (image.width > MAX_SIZE) {
                image.height *= MAX_SIZE / image.width
                image.width = MAX_SIZE
            }
        
            const ctx = canvas.getContext('2d')
            canvas.width = image.width
            canvas.height = image.height
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, image.width, image.height)
        
            const dataURL = canvas.toDataURL('image/png;base64;')

            setOptimizing(false)
            setOptimized(true)
            saveDataURI(dataURL)
        }
        image.src = src
    }
    
    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()
    

    const saveDataURI = dataURI => {
        setUpdated(true)
        setUploading(true)
        axios
            .post('/api/upload/avatar', { _id: user._id, dataurl: dataURI }, { new: true })
            .then(({ data }) => {
                setUploading(false)
                dispatch({ type: 'SET_USER', user: data.user })
                if (onComplete) onComplete()
            })
            .catch(err => console.log('Error saving dataURI', err))
    }
    
    
    const handleDrop = async dataUrl => {
        
        const reader = new FileReader()
        
        reader.onload = e => {
            const image = e.target.result
            const exif = EXIF.readFromBinaryFile(image)
            resetOrientation(dataUrl, exif ? exif.Orientation : null)
        }
        const blob = await dataURItoBlob(dataUrl)
        reader.readAsArrayBuffer(blob)
    }
    
    const setEditorRef = ref => setEditor(ref)
    
    const validateForm = () => {
        // TODO: need to update
        const isInvalid = optimizing
        return isInvalid
    }

    const resetOrientation = (srcBase64, srcOrientation) => {

        const image = new Image()

        image.onload = () => {
          const width = image.width,
                height = image.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d')
            
            // set proper canvas dimensions before transform & export
            if (srcOrientation > 4 && srcOrientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }
    
            // draw image
            ctx.drawImage(image, 0, 0)
            
            setPreview(canvas.toDataURL())
        }
    
        image.src = srcBase64
    }

    // const reactAvatarEditor = () => (
    //     <ReactAvatarEditor
    //         image={preview}
    //         width={size - 50}
    //         height={size - 50}
    //         border={25}
    //         color={[0, 0, 0, 0.2]}
    //         scale={1.2}
    //         rotate={0}
    //         ref={ref => setEditorRef(ref)}
    //     />
    // )
    
    return (
        <View
            id='avatar-dropzone-wrapper'
            style={styles.avatarDropzoneWrapper}
        >
            <View
                style={styles.wrapper}
                id='avatar-editor-wrapper'
            >
                {!preview ? (
                    <FileSelector
                        handleDrop={uri => handleDrop(uri)}
                    />
                ) : (
                    <Preview
                        dataURL={preview}
                    />
                )}
                    
            </View>

            <View style={styles.controls}>
                <CircleButton
                    disabled={!preview}
                    onPress={resetEditor}
                    style={styles.control}
                >
                    <CloseCircleOutlined style={{ fontSize: 42, color: '#fff' }} />
                </CircleButton>
                <CircleButton
                    disabled={uploading || !preview || validateForm()}
                    onPress={handleSubmit}
                    style={styles.control}
                >
                    <UpCircleOutlined style={{ fontSize: 42, color: '#fff' }} />
                </CircleButton>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    avatarDropzoneWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        // borderWidth: 1,
        // borderColor: 'green',
        backgroundColor: '#eee',
        width: '100%',
        borderRadius: 10,
        paddingTop: 15,
        marginBottom: 15,
    },
    wrapper: {
        flex: 1,
        marginHorizontal: 'auto',
    },
    controls: {
        marginVertical: 10,
        paddingTOp: 10,
        width: '100%',
        // minWidth: 300,
        // maxWidth: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    control: {
        flex: 1,
        padding: 10,
    },
})