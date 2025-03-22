const Bond = require('../../models/Bond')

const getBonds = async (req, res) => {
    
    const { userId } = req.params

    try {

        const bonds = await Bond
            .find({
                $or: [
                    { sender: userId },
                    { responder: userId },
                ]
            })
            .select('_id sender responder confirmed declined cancelled actionerId')
        
        return res.status(200).json({ bonds })

    } catch (e) {

        console.error('Error getting bonds', e)

        return res.status(200).json(null)
    }
}

module.exports = getBonds