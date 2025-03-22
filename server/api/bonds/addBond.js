const Bond = require('../../models/Bond')

const addBond = async (req, res) => {
    
    const { responderId, userId } = req.body

    try {

        let bond = await Bond
            .findOneAndUpdate({
                $or: [
                    { $and: [{ sender: userId }, { responder: responderId }] },
                    { $and: [{ sender: responderId }, { responder: userId }] },
                ]
            }, {
                $set: {
                    cancelled: false,
                    declined: false,
                },
            }, { new: true })

        if (bond) {
            
            return res.status(200).json({ bond })
        } else {
            bond = await Bond.create({
                sender: userId,
                responder: responderId,
                confirmed: false,
                declined: false,
                cancelled: false,
                actionerId: userId,
            })
            
            // const savedBond = await newBond.save()
            
            if (bond) {

                bond = await Bond
                    .findById(bond._id)
                    .select('_id sender responder confirmed declined cancelled actionerId')
            
                return res.status(200).json({ bond })

            }
        }
        return res.status(200).json(null)
    } catch (e) {
        console.error('Error adding bond', e)
        return res.status(200).json(null)
    }
}

module.exports = addBond