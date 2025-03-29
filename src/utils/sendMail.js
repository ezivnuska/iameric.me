import axios from 'axios'

const sendMail = async () => {
    const data = await axios.post('api/mail', { email: 'ezivnuska@gmail.com', content: 'testing email' })
    console.log('mail data', data)
}

export default sendMail