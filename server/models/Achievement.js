import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: String, default: '' },
    event: { type: String, default: '' },
    date: { type: String, default: '' },
    image: { type: String, default: '' },
    ribbon: { type: String, default: '🥇 1st Prize' },
    ribbonClass: { type: String, default: 'gold' },
    cardClass: { type: String, default: 'gold-badge' },
    icon: { type: String, default: '🏆' }
  },
  { timestamps: true }
);

export const Achievement = mongoose.model('Achievement', achievementSchema);
