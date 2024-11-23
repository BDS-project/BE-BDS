import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    avatar: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'customer', 'advisor'],
      default: 'customer',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'disabled', 'suspended'],
      default: 'active'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

userSchema.virtual('customerAppointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'customer',
  justOne: false,
  options: { sort: { created_at: -1 } }
});

userSchema.virtual('advisorAppointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'advisor',
  justOne: false,
  options: { sort: { created_at: -1 } }
});

userSchema.pre(['find', 'findOne'], function() {
  const populateField = this._conditions.role === 'advisor' ? 'advisorAppointments' : 'customerAppointments';
  this.populate(populateField);
});

export default mongoose.model('User', userSchema);
