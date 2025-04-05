import axios from 'axios'

const scrape = async url => {
    const { data } = await axios.post('/api/scrape', { url })
    if (!data || !data.response) console.log('Error scraping url')
    else return data.response

    return null
}

export default scrape