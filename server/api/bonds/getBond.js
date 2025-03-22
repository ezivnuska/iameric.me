const Bond = require('../../models/Bond')

const getBond = async (req, res) => {
    
    const { user1, user2 } = req.body

    try {

        const bond = await Bond
            .findOne({
                $or: [
                    { $and: [{ sender: user1 }, { responder: user2 }] },
                    { $and: [{ sender: user2 }, { responder: user1 }] },
                ]
            })
            .select('_id sender responder confirmed declined cancelled actionerId')
        
        return res.status(200).json({ bond })

    } catch (e) {

        console.error('Error getting bond', e)

        return res.status(200).json(null)
    }
}

module.exports = getBond