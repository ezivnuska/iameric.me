const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    password: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    phone: {
      type: Schema.Types.String,
    },
    bio: {
        type: Schema.Types.String
    },
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'UserImage',
    },
    role: {
      type: Schema.Types.String,
      default: 'user',
    },
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    token: {
        type: Schema.Types.String,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
    },
    location: {
        latitude: {
            type: Schema.Types.String,
        },
        longitude: {
            type: Schema.Types.String,
        },
    },
    exp: {
        type: Date,
        // required: true,
    },
    deposit: {
        type: Schema.Types.Number,
        default: 0,
    },
    wages: {
        type: Schema.Types.Number,
        default: 0,
    },
    available: {
        type: Schema.Types.Boolean,
        default: false,
    },
    fiction: {
        type: Schema.Types.Boolean,
        default: false,
    },
},
{
    timestamps: true,
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

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
