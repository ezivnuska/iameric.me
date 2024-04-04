import React, { useContext, useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    ForumList,
    EmptyStatus,
} from '.'
import { AppContext } from '@context'
import { useForum } from '../context/ForumContext'
import axios from 'axios'

export default () => {
    
    const {
        isLandscape,
    } = useContext(AppContext)

    const { entries, setEntries } = useForum()

    useEffect(() => {
        const init = async () => {
            const { data } = await axios.get('/api/entries')
        
            if (data && data.entries) {
                setEntries(data.entries)
            }
        }
        init()
    }, [])

    return (
        <View style={{ flex: 1, flexGrow: 1 }}>
            {entries
                ? (
                    <ForumList
                        horizontal={isLandscape}
                        items={entries}
                        onDelete={id => removeItemById(id)}
                    />
                )
                : <EmptyStatus status='No entries yet.' />
            }
        </View>
    )
}