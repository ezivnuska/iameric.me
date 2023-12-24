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
        // state,
        user,
    } = useContext(AppContext)
    
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
                    <Brand onPress={() => navigate(user ? 'Home' : 'Start')} />
                </View>

                <View
                    style={{
                        flexBasis: 'auto',
                    }}
                >
                    <AuthMenu />
                </View>
            </View>

        </CenteredContent>
    )
}