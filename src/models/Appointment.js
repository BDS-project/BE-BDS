import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    appointment_date: {
      type: Date,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

appointmentSchema.pre(['find', 'findOne'], function () {
  this.populate([
    {
      path: 'customer',
      select: 'first_name last_name email role status avatar'
    },
    { path: 'advisor', select: 'first_name last_name email role status avatar' }
  ]);
});

export default mongoose.model('Appointment', appointmentSchema);
