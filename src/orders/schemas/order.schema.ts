import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  id: String,
  buy: Boolean,
  deets: Boolean,
  name: String,
  phone: Number,
  count: Number,
  price: Number,
});
