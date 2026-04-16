const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName:    { type: String, required: true },
  customerEmail:   { type: String, required: true },
  customerAddress: { type: String, required: true },
  paymentMethod:   { type: String, enum: ['card', 'paypal', 'cod'], default: 'card' },
  items: [
    {
      product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price:    { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  status:     { type: String, enum: ['pending', 'processing', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);