const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: Schema.Types.String,
        required: true,
    },
    threadId: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
    }
},
{
    timestamps: true,
})

PostSchema.pre('save', function(next) {
    if (!this.threadId) {
        this.threadId = this._id
    }
    return next()
})
// UserSchema.pre('save', function(next) {

//   if(!this.isModified('password')) {
//     return next()
//   }

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err)

//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if(err) return next(err)
//       this.password = hash
//       console.log('new user PW hash', hash)

//       next()
//     })
//   })
// })

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel
