import mongoose from 'mongoose';

const blockItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ['hero', 'article', 'cta', 'media', 'quote', 'grid'],
    required: true,
  },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  body: { type: String, default: '' },
  accent: { type: String, default: 'sage' }, // 'sage' | 'bordeaux' | 'olive'
  published: { type: Boolean, default: true },
  metrics: {
    views: { type: Number, default: 120 },
    readTime: { type: String, default: '3 min read' },
  }
});

const pageContentSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  blocks: [blockItemSchema],
  version: { type: Number, default: 1 },
  lastEditedBy: { type: String, default: 'Lead Content Architect' },
  updatedAt: { type: Date, default: Date.now },
});

export const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', pageContentSchema);
