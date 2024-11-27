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
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('customer_appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'customer',
  justOne: false
});

userSchema.virtual('advisor_appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'advisor',
  justOne: false
});

export default mongoose.model('User', userSchema);
