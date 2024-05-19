import mongoose from 'mongoose';
import { PRODUCT_STATUS } from '../constants/product.constant.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    manager: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false, //몽고디비에서 find 명령으로 조회해도 자동적으로 조회되지 않음 / 따로 명령 필요
    },
    status: {
      type: String,
      require: true,
      enum: Object.values(PRODUCT_STATUS), // ['FOR_SALE','SOLD_OUT']
      default: PRODUCT_STATUS.FOR_SALE,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Product = mongoose.model('Product', productSchema);
