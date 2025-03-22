const Bond = require('../../models/Bond')

const addBond = async (req, res) => {
    
    const { responderId, userId } = req.body

    try {

        const existingBond = await Bond.findOne({
            $or: [
                { $and: [{ sender: userId }, { responder: responderId }] },
                { $and: [{ sender: responderId }, { responder: userId }] },
            ]
        })

        if (!existingBond) {
            let newBond = new Bond({
                sender: userId,
                responder: responderId,
                confirmed: false,
                declined: false,
                actionerId: userId,
            })
            
            const savedBond = await newBond.save()
            
            const bond = await Bond.findById(savedBond._id)
                .select('_id sender responder confirmed declined cancelled actionerId')
        
            return res.status(200).json({ bond })
        }
    } catch (e) {
        console.error('Error adding bond', e)
        return res.status(200).json(null)
    }
}

module.exports = addBond