import { Schema, model } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    published: { type: Boolean, default: true },
    modules: [{ 
          type: Schema.Types.ObjectId, 
          ref: 'Module'
        }]
  },
  { timestamps: true }
);

export const Course = model('Course', courseSchema);
