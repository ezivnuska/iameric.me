import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    CenteredContent,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import base from '../styles/base'

export default () => {
    
    const {
        user,
    } = useContext(AppContext)

    const onBrandClicked = () => {
        if (user) navigate('Orders')
        else navigate('Splash')
    }
    
    return (
        <CenteredContent type='full' style={{ backgroundColor: base.headerBGColor }}>
            
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 900,
                    marginHorizontal: 'auto',
                    height: 50,
                    minHeight: 50,
                    maxHeight: 50,
                }}
            >
                
                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <Brand onPress={onBrandClicked} />
                </View>

                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <AuthMenu
                        onPress={() => navigate('Settings')}
                    />
                </View>
            </View>

        </CenteredContent>
    )
}