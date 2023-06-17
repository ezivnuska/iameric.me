import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = Schema({
  time: {
    type: Date,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  street: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.String,
    required: true,
  },
},
{
  timestamps: true,
})

export default mongoose.model('Task', taskSchema)
