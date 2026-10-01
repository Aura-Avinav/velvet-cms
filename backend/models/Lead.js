import mongoose from 'express'; // or mongoose
import mongoosePkg from 'mongoose';

const { Schema, model } = mongoosePkg;

const leadSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    default: 'Anonymous Pioneer',
  },
  company: {
    type: String,
    trim: true,
    default: 'Independent',
  },
  type: {
    type: String,
    enum: ['demo', 'newsletter', 'enterprise'],
    default: 'newsletter',
  },
  role: {
    type: String,
    default: 'Developer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lead = mongoosePkg.models.Lead || model('Lead', leadSchema);
