import React, { useContext } from 'react'
import {
    Image,
    Text,
    View,
} from 'react-native'
import main from '../styles/main'
import { EditButton } from '.'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ product, onDelete, onPress, ...props }) => {

    const {
        user,
    } = useContext(AppContext)
    
    return (
        <View
            {...props}
            style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 10,
            }}
        >
            <View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    
                    <Text style={[
                        main.text,
                        {
                            fontSize: 18,
                            fontWeight: 700,
                        }
                    ]}>
                        {product.title} <EditButton onPress={onPress} />
                    </Text>
                    
                    <Text style={[
                        main.text,
                        {
                            flex: 1,
                            flexBasis: '20%',
                            textAlign: 'right',
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#666',
                        }
                    ]}>
                        ${product.price}
                    </Text>

                </View>
                
                {product.image ? (
                    <Image
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        source={{ uri: `${IMAGE_PATH}/${user.username}/thumb/${product.image.filename}` }}
                        style={{
                            resizeMode: 'stretch',
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
                            borderWidth: 1,
                            borderColor: '#999',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    />
                ) : null}
                <Text style={main.text}>{product.blurb}</Text>
                <Text style={main.text}>{product.desc}</Text>
            </View>
            
        </View>
    )
}