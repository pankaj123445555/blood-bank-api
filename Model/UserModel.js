const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Hospital schema
const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  phoneNumber: String,
  bloodSamples: [
    {
      bloodGroup: String,
      quantity: Number
    }
  ]
});

// Define Receiver schema
const receiverSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  phoneNumber: String,
  bloodGroup: String,
  isEligible: Boolean
});
const requestSchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'Receiver',
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create models from the schemas
const Hospital = mongoose.model('Hospital', hospitalSchema);
const Receiver = mongoose.model('Receiver', receiverSchema);
const Request = mongoose.model('Request',requestSchema)

module.exports = {
  Hospital,
  Receiver,
  Request
};
