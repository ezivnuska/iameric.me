import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
    LoadingView,
    QuantityControl,
} from '.'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'
import { loadProduct } from '@utils/data'
import { getImageDims } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product }) => {

    const theme = useTheme()

    const dims = useWindowDimensions()

    const {
        dispatch,
        isLandscape,
        loading,
    } = useContext(AppContext)

    // const [product, setProduct] = useState(null)

    const [imageDims, setImageDims] = useState(null)
    
    const [quantity, setQuantity] = useState(1)

    // useEffect(() => {
    //     init()
    // }, [])

    // const init = async () => {
    //     const { data } = await loadProduct(dispatch, id)
    //     if (!data) return console.log('could not load product')
    //     else {
    //         console.log('loadedProduct', data)
    //         setProduct(data)
    //     }
    // }

    useEffect(() => {
        if (product)
            setImageDims(getImageDims(product.image.width, product.image.height, dims))
    }, [])

    const addToCart = (item, quantity) => {
        dispatch({ type: 'ADD_TO_CART', product: item, quantity })
    }

    useEffect(() => {
        if (dims && product)
            setImageDims(getImageDims(product.image.width, product.image.height, dims))
    }, [dims])
    
    if (loading) return <LoadingView />

    return product ? (
        <View
            style={{
                width: '100%',
                minWidth: 280,
                maxWidth: isLandscape ? 600 : 300,
                marginHorizontal: 'auto',
            }}
        >
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: isLandscape ? 'row' : 'column',
                    justifyContent: isLandscape ? 'flex-start' : 'center',
                    gap: 15,
                }}
            >
                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <Image
                        source={{
                            uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}`
                        }}
                        style={{
                            marginHorizontal: 'auto',
                            flexBasis: 'auto',
                            width: imageDims ? imageDims.width : 0,
                            height: imageDims ? imageDims.height : 0,
                            resizeMode: 'center',
                            borderWidth: 1,
                            borderColor: theme?.colors.border,
                        }}
                    />
                    {/* <View
                        style={{
                            width: 200,
                            height: 200,
                            marginHorizontal: isLandscape ? 0 : 'auto',
                            background: 'white',
                        }}
                    >
                        <ThemedText>[image]</ThemedText>
                    </View> */}
                </View>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 10,
                    }}
                >
                    <View
                        style={{
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            
                            <ThemedText
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexBasis: 'auto',
                                    flexGrow: 1,
                                    flexBasis: '80%',
                                }}
                            >
                                {product.title}
                            </ThemedText>

                            <ThemedText
                                style={{
                                    flexBasis: '20%',
                                    textAlign: 'right',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexGrow: 0,
                                }}
                            >
                                ${product.price}
                            </ThemedText>
                        </View>
                            
                        <ThemedText>
                            {product.blurb}
                        </ThemedText>
                        
                        <ThemedText>
                            {product.desc}
                        </ThemedText>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'stretch',
                            alignItems: 'center',
                            gap: 10,
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <QuantityControl
                                value={quantity}
                                onChange={value => setQuantity(value)}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <IconButton
                                type='primary'
                                label={`${quantity > 1 ? `${quantity} ` : ''} ($${Number(Number(product.price) * quantity).toFixed(2)})`}
                                onPress={() => addToCart(product, quantity)}
                                textStyles={{ color: theme?.colors.buttonLabel, wrap: 'nowrap', lineHeight: 35, }}
                                // style={{ flex: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ) : null
}

// export default ({ id }) => {

//     const theme = useTheme()

//     const dims = useWindowDimensions()

//     const {
//         dispatch,
//         isLandscape,
//         loading,
//     } = useContext(AppContext)

//     const [product, setProduct] = useState(null)

//     const [imageDims, setImageDims] = useState(null)
    
//     const [quantity, setQuantity] = useState(1)
    
//     const getImageDims = (w, h) => {
//         const maxHeight = isLandscape ? dims.height - 50 : dims.height / 2
//         let maxWidth = isLandscape ? (dims.width * 0.4) - 20 : dims.width - 20
//         if (maxWidth > 300) maxWidth = 300
//         console.log('maxWidth', maxWidth)
//         console.log('maxHeight', maxHeight)
//         let scale = 1
//         let width = w
//         let height = h
//         if (w >= h) {// if landscape
//             if (h >= maxHeight) {
//                 scale = maxHeight / height
//                 width *= scale
//                 height *= scale
//             } 
//             if (w >= maxWidth) {
//                 scale = maxWidth / width
//                 width *= scale
//                 height *= scale
//             }
//         } else {// if portrait
//             if (w >= maxWidth) {
//                 scale = maxWidth / width
//                 width *= scale
//                 height *= scale
//             }
//             if (h >= maxHeight) {
//                 scale = maxHeight / height
//                 width *= scale
//                 height *= scale
//             }
//         }
//         console.log('width/height', width, height)
//         return { width, height }
//     }

//     useEffect(() => {
//         init()
//     }, [])

//     const init = async () => {
//         const { data } = await loadProduct(dispatch, id)
//         if (!data) return console.log('could not load product')
//         else {
//             console.log('loadedProduct', data)
//             setProduct(data)
//         }
//     }

//     useEffect(() => {
//         if (product)
//             setImageDims(getImageDims(product.image.width, product.image.height))
//     }, [product])

//     const addToCart = (item, quantity) => {
//         dispatch({ type: 'ADD_TO_CART', product: item, quantity })
//     }

//     useEffect(() => {
//         if (dims && product)
//             setImageDims(getImageDims(product.image.width, product.image.height))
//     }, [dims])

//     // useEffect(() => {
//     //     if (imageDims) {
//     //         const { width, height } = imageDims
//     //         console.log(width + 'x' + height)
//     //         console.log('isLandscape', isLandscape)
//     //     }
//     // }, [imageDims])
    
//     if (loading) return <LoadingView />

//     return product ? (
//         <View
//             style={{
//                 // flex: 1,
//                 // flexGrow: 1,
//                 display: 'flex',
//                 flexDirection: isLandscape ? 'row' : 'column',
//                 justifyContent: isLandscape ? 'space-evenly' : 'center',
//                 gap: 10,
//                 // flexWrap: 'nowrap',
//                 width: isLandscape ? '85%' : '100%',
//                 // maxWidth: imageDims ? imageDims.width : 300,
//                 marginHorizontal: 'auto',
//                 marginVertical: 15,
//                 paddingHorizontal: isLandscape ? 0 : 10,
//                 // borderWidth: 1,
//                 // borderColor: 'green',
//                 // borderStyle: 'dotted',
//             }}
//         >
//             {product.image ? (
//                 <View
//                     style={{
//                         // flex: 1,
//                         flexBasis: 'auto',
//                         flexGrow: isLandscape ? 0 : 1,
//                         flexShrink: isLandscape ? 1 : 0,
//                         // borderWidth: 1,
//                         // backgroundColor: 'blue',
//                     }}
//                 >
//                     <Image
//                         source={{
//                             uri: `${IMAGE_PATH}/${product.vendor.username}/${product.image.filename}`
//                         }}
//                         style={{
//                             marginHorizontal: 'auto',
//                             flexBasis: 'auto',
//                             width: imageDims ? imageDims.width : 0,
//                             height: imageDims ? imageDims.height : 0,
//                             resizeMode: 'center',
//                             borderWidth: 1,
//                             borderColor: theme?.colors.border,
//                         }}
//                     />
                
//                     <View
//                         style={{
//                             display: 'flex',
//                             flexDirection: isLandscape ? 'column' : 'column',
//                             justifyContent: isLandscape ? 'flex-start' : 'space-evenly',
//                             gap: 10,
//                         }}
//                     >
//                         <QuantityControl
//                             value={quantity}
//                             onChange={value => setQuantity(value)}
//                         />
    
//                         <IconButton
//                             type='primary'
//                             label={`${quantity > 1 ? `${quantity} ` : ''} ($${Number(Number(product.price) * quantity).toFixed(2)})`}
//                             onPress={() => addToCart(product, quantity)}
//                             textStyles={{ color: theme?.colors.buttonLabel, wrap: 'nowrap' }}
//                             // style={{ flex: 1 }}
//                         />
//                     </View>
//                 </View>
//             ) : null}

//             <View
//                 style={{
//                     flex: 1,
//                     flexBasis: 'auto',
//                     flexGrow: isLandscape ? 1 : 0,
//                     flexShrink: isLandscape ? 1 : 0,
//                     // flexDirection: 'column',
//                     maxWidth: isLandscape ? '50%' : 'fit-content',
//                     minWidth: isLandscape ? '50%' : 'max-content',
//                     borderWidth: 1,
//                     borderColor: 'red',
//                 }}
//             >
//                 <View
//                     style={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         gap: 10,
//                     }}
//                 >
                    
//                     <View
//                         style={{
//                             flexBasis: 'auto',
//                             flexGrow: 1,
//                             flexShrink: 1,
//                         }}
//                     >
//                         <View
//                             style={{
//                                 display: 'flex',
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                             }}
//                         >
                            
//                             <ThemedText
//                                 style={{
//                                     fontSize: 18,
//                                     fontWeight: 700,
//                                     flexBasis: 'auto',
//                                     flexGrow: 1,
//                                     flexBasis: '80%',
//                                 }}
//                             >
//                                 {product.title}
//                             </ThemedText>

//                             <ThemedText
//                                 style={{
//                                     flexBasis: '20%',
//                                     textAlign: 'right',
//                                     fontSize: 18,
//                                     fontWeight: 700,
//                                     flexGrow: 0,
//                                 }}
//                             >
//                                 ${product.price}
//                             </ThemedText>

//                         </View>
//                     </View>
//                 </View>
                
//                 <ThemedText>
//                     {product.blurb}
//                 </ThemedText>
                
//                 <ThemedText>
//                     {product.desc}
//                 </ThemedText>
//             </View>
            

//         </View>
//     ) : null
// }