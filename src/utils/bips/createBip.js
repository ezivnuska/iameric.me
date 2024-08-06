import axios from 'axios'

// creates new Bip document
// bip = {
//     user: user._id,
//     images: [{
//         userId,
//         imageData,
//         thumbData,
//         location,
//     }],
// }

export default createBip = async (id, location) => {
    const { data } = await axios.post('/api/bip', { user: id, location })
    if (!data || !data.bip) console.log('could not create new bip.')
    else return data.bip
    return null
}