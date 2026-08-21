import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Projects', 'Achievements', 'Events', 'Photography', 'Certificates'],
      default: 'Projects'
    },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);
