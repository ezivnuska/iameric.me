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
    Dropzone,
    FileSelector,
} from './'
import EXIF from 'exif-js'
import { AppContext } from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import defaultStyles from '../styles'

const API_PATH = '/api'
// const API_PATH = process.env.API_PATH || '/api'
const windowDimensions = Dimensions.get('window')
const screenDimensions = Dimensions.get('screen')

const AvatarModule = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [ size, setSize ] = useState(300)
    const [ preview, setPreview ] = useState(null)
    const [ error, setError ] = useState('')
    const [ optimizing, setOptimizing ] = useState(false)
    const [ optimized, setOptimized ] = useState(false)
    const [ updated, setUpdated ] = useState(false)

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    })

    const [ editor, setEditor ] = useState(null)

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen })

                const dropzone = document.getElementById('avatar-dropzone-wrapper')
                if (dropzone) {
                    const maxWidth = size || 375
                    const actualWidth = dropzone.offsetWidth
                    setSize(actualWidth > maxWidth ? maxWidth : actualWidth)
                }
            }
        )
        return () => subscription.remove()
    }, [])

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
        console.log('saving data URI', user.username)
        setUpdated(true)
        axios
            .post(`${API_PATH}/upload/avatar`, { dataurl: dataURI, username: user.username }, { new: true })
            .then(({ data }) => {
                dispatch({ type: 'SET_USER', user: data.user })
            })
            .catch(err => console.log('Error saving dataURI', err))
    }
    
    
    const handleDrop = async dataUrl => {
        const reader = new FileReader()
        reader.onload = e => {
            const image = e.target.result
            const exif = EXIF.readFromBinaryFile(image)
            alert(`exif, ${exif}`)
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
        alert(`srcOrientation: ${srcOrientation}`)
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
        
            // transform context before drawing image
            // switch (srcOrientation) {
            //     case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
            //     case 3: ctx.transform(-1, 0, 0, -1, width, height ); break
            //     case 4: ctx.transform(1, 0, 0, -1, 0, height ); break
            //     case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
            //     case 6: ctx.transform(0, 1, -1, 0, height, 0); break
            //     case 7: ctx.transform(0, -1, -1, 0, height , width); break
            //     case 8: ctx.transform(0, -1, 1, 0, 0, width); break
            //     default: break
            // }
    
            // draw image
            ctx.drawImage(image, 0, 0)
            
            setPreview(canvas.toDataURL())
        }
    
        image.src = srcBase64
    }
    
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

                    // <Dropzone
                    //     id='dropzone'
                    //     handleDrop={dataUrl => handleDrop(dataUrl)}
                    //     noClick={preview !== null}
                    //     style={{
                    //         width: size + 'px',
                    //         height: size + 'px',
                    //         marginTop: 20 + 'px',
                    //     }}
                    // />
                ) : (
                    <ReactAvatarEditor
                        image={preview}
                        width={size - 50}
                        height={size - 50}
                        border={25}
                        color={[0, 0, 0, 0.2]}
                        scale={1.2}
                        rotate={0}
                        ref={ref => setEditorRef(ref)}
                    />
                )}
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={resetEditor}
                    disabled={!preview}
                    style={defaultStyles.button}
                >
                    <Text style={defaultStyles.buttonLabel}>Reset Form</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!preview || validateForm()}
                    style={defaultStyles.button}
                >
                    <Text style={defaultStyles.buttonLabel}>Submit Form</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AvatarModule

const styles = StyleSheet.create({
    avatarDropzoneWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
		minWidth: 375,
		maxWidth: 400,
    },
    wrapper: {
        flex: 1,
        marginHorizontal: 'auto',
        borderWidth: 3,
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    controls: {
        marginVertical: 10,
    },
})