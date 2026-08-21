import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'Web Development' },
    technologies: [{ type: String }],
    image: { type: String, default: '' },
    githubUrl: { type: String, default: 'https://github.com/Arya99-as' },
    github: { type: String, default: 'https://github.com/Arya99-as' },
    liveUrl: { type: String, default: '#' },
    liveDemo: { type: String, default: '#' },
    featured: { type: Boolean, default: false },
    initials: { type: String, default: 'PR' },
    typeBadge: { type: String, default: 'Web Application' },
    cardAccent: { type: String, default: 'linear-gradient(135deg, #F2B84B, #E67E22)' },
    keyFeatures: [{ type: String }]
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
