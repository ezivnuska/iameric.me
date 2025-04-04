import React, { useEffect }  from 'react'
import { Button } from 'react-native-paper'
import { Screen } from './components'
import { Touch } from '@components'
import sendMail from '@utils/sendMail'
import scrape from '@utils/scrape'

const Sandbox = props => {

    const scrapeUrl = async url => {
        const metadata = await scrape(url)
        console.log('metadata scraped:', metadata)
    }

    useEffect(() => {
        // scrapeUrl('https://microlink.io')
    }, [])
    
    return (
        <Screen full secure {...props}>
            <Touch />
            <Button onPress={sendMail}>Send Mail</Button>
        </Screen>
    )
}

export default Sandbox