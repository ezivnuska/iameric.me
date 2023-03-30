import React, { useContext, useEffect, useState } from 'react'
import {
    Image as NativeImage,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Avatar } from './'
import axios from 'axios'
// import ReactAvatarEditor from 'react-avatar-editor'
// import {
//     // launchCamera,
//     launchImageLibrary,
// } from 'react-native-image-picker'
import EXIF from 'exif-js'
import { AppContext } from '../AppContext'
// const API_PATH = process.env.API_PATH || '/api'
const API_PATH = '/api'


const ImageHandler = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [files, setFiles] = useState([])
    const [error, setError] = useState(null)
    // const [preview, setPreview] = useState(null)
    const [editor, setEditor] = useState(null)
    const [ size, setSize ] = useState(300)

    useEffect(() => {
        console.log('files...', files)
    }, [files])

    useEffect(() => {
        if (error) {
            setError(null)
            console.log('error...', error)
        }
    }, [error])

    useEffect(() => {
        if (user) console.log('user', user)
    }, [user])

    const initSelector = async () => {
        return
        // const libraryInput = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
        // if (libraryInput.errorCode) setError(libraryInput.errorMessage)
        // const dataURI = libraryInput.assets[0].uri
        // if (libraryInput.assets) {
        //     setFiles([...files, ...libraryInput.assets])
        //     // setPreview(dataURI)
        // }
    }

    const handlePress = e => {
        e.preventDefault()
        initSelector()
    }

    const setEditorRef = ref => setEditor(ref)

    const removePreview = key => setFiles(files.filter((file, index) => index !== key))

    const renderImages = () => {
        return (files && files.length) ? (
            <View style={styles.showcase}>
                {files.map((file, key) => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => removePreview(key)}
                    >
                        <NativeImage
                            source={{
                                uri: file.uri,
                            }}
                            style={[
                                {
                                    width: 100,
                                    height: 100,
                                },
                                styles.preview,
                            ]}
                        />
                    </TouchableOpacity>
                )
                )}
            </View>
        ) : null
    }

    const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

    const onSubmit = e => {
        e.preventDefault()
        const canvas = editor.getImage()
        const dataURL = canvas.toDataURL('image/png;base64;')
        optimizeImage(dataURL)
    }

    const optimizeImage = src => {
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
            
            uploadImage(dataURL)
        }
        image.src = src
    }

    const uploadImage = async uri => {
        const { username } = user
        axios
            .post(`${API_PATH}/upload/avatar`, { uri, username }, { new: true })
            .then(({ data }) => console.log('uploaded', data))//dispatch({ type: 'SET_USER', user: data.user }))
            .catch(err => console.log('Error saving dataURI', err))
    }

    const resetOrientation = (srcBase64, srcOrientation) => {
        const image = new Image()

        image.onload = () => {
          const width = image.width,
                height = image.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d')
            
            // set proper canvas dimensions before transform & export
            if (4 < srcOrientation && srcOrientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }
        
            // transform context before drawing image
            switch (srcOrientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
                case 3: ctx.transform(-1, 0, 0, -1, width, height ); break
                case 4: ctx.transform(1, 0, 0, -1, 0, height ); break
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
                case 6: ctx.transform(0, 1, -1, 0, height , 0); break
                case 7: ctx.transform(0, -1, -1, 0, height , width); break
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break
                default: break
            }
    
            // draw image
            ctx.drawImage(image, 0, 0)
            
            // setPreview(canvas.toDataURL())
            const copy = [...files]
            copy[0].uri = canvas.toDataURL()
            setFiles(copy)
        }
    
        image.src = srcBase64
    }

    const onChange = async () => {
        const canvas = editor.getImage()
        const dataURL = canvas.toDataURL('image/png;base64;')

        const reader = new FileReader()
        reader.onload = e => {
            const image = e.target.result
            const exif = EXIF.readFromBinaryFile(image)
            resetOrientation(dataURL, exif ? exif.Orientation : null)
        }
        const blob = await dataURItoBlob(dataURL)
        reader.readAsArrayBuffer(blob)
    }

    return (
        <View style={styles.container}>
            <Avatar user={user} />
            
            <TouchableOpacity
                onPress={handlePress}
            >
                <Text>Select Image</Text>
            </TouchableOpacity>
            {(files && files.length) ? renderImages() : null}
            {(files && files.length) ? (
                <View>
                    {/*<ReactAvatarEditor
                        image={files[0].uri}
                        width={size - 50}
                        height={size - 50}
                        border={25}
                        color={[0, 0, 0, 0.2]}
                        scale={1.2}
                        rotate={0}
                        ref={ref => setEditorRef(ref)}
            />*/}
                    <TouchableOpacity
                        onPress={onSubmit}
                    >
                        <Text>Upload</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    )
}

export default ImageHandler

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    showcase: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
    },
    preview: {
        margin: 5,
    },
})