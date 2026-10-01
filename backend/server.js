import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lead } from './models/Lead.js';
import { PageContent } from './models/BlockContent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory fallback store if MongoDB is not connected
let isMongoConnected = false;

const inMemoryStore = {
  leads: [
    {
      id: 'lead-1',
      name: 'Elena Rostova',
      email: 'elena@velvetstudios.design',
      company: 'Velvet Design Group',
      type: 'demo',
      role: 'Head of Content',
      createdAt: new Date().toISOString()
    }
  ],
  pageContent: {
    slug: 'home-preview',
    title: 'Autumn Editorial Collection 2026',
    version: 4,
    lastEditedBy: 'Lead Content Architect',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-1',
        type: 'hero',
        badge: 'NEW CURATION',
        title: 'Architectures of Modern Stillness',
        subtitle: 'Bespoke editorial storytelling powered by structured headless content graphs and real-time visual canvases.',
        body: 'Crafted for designers, publishers, and modern engineering teams who demand precision and aesthetic discipline.',
        accent: 'bordeaux',
        published: true,
        metrics: { views: 1420, readTime: '4 min' }
      },
      {
        id: 'blk-2',
        type: 'article',
        badge: 'DEEP DIVE',
        title: 'Decoupled Publishing Without The Complexity',
        subtitle: 'Instant CDN edge previews, sub-millisecond GraphQL queries, and zero layout shift.',
        body: 'Empower writers with WYSIWYG block mechanics while developers consume pure typed JSON with full schema parity across mobile, web, and IoT surfaces.',
        accent: 'sage',
        published: true,
        metrics: { views: 890, readTime: '6 min' }
      },
      {
        id: 'blk-3',
        type: 'quote',
        badge: 'EDITORIAL SPOTLIGHT',
        title: 'Design as an Operating System',
        subtitle: '"A CMS should elevate your creative voice, not constrain your layout into rigid templates."',
        body: '— Julian Vance, Design Director at Atelier Monolith',
        accent: 'olive',
        published: true,
        metrics: { views: 2310, readTime: '2 min' }
      },
      {
        id: 'blk-4',
        type: 'cta',
        badge: 'INTEGRATION',
        title: 'Publish in One Click across 12 Frameworks',
        subtitle: 'Native SDKs for Next.js, Nuxt, Astro, Remix, React Native, and Swift.',
        body: 'Connect your Git repositories and publish live changes directly to your production edge network.',
        accent: 'sage',
        published: true,
        metrics: { views: 760, readTime: '1 min' }
      }
    ]
  }
};

// Attempt MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/velvet_cms';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000,
}).then(() => {
  isMongoConnected = true;
  console.log('✨ [Database] Connected successfully to MongoDB:', MONGO_URI);
}).catch((err) => {
  isMongoConnected = false;
  console.log('ℹ️ [Database] MongoDB is not running locally. Utilizing resilient in-memory data engine for immediate zero-friction demo execution.');
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? 'mongodb' : 'in-memory-engine',
    engine: 'Bordeaux-Sage CMS Core v3.4.2'
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    uptime: '99.99%',
    apiLatency: '38ms',
    monthlyQueries: '14.8M+',
    customerRating: '4.95 / 5.0',
    edgeNodes: '310+ Global PoPs',
    activeTeams: '2,400+'
  });
});

// Code Snippets for API Switcher
app.get('/api/code-snippets', (req, res) => {
  res.json({
    graphql: {
      label: 'GraphQL Query',
      language: 'graphql',
      code: `query GetEditorialPage($slug: String!) {
  page(slug: $slug) {
    id
    title
    slug
    publishedAt
    blocks {
      ... on HeroBlock {
        badge
        headline
        callToAction {
          label
          url
        }
      }
      ... on ArticleBlock {
        leadText
        body
        author {
          name
          avatarUrl
        }
      }
    }
  }
}`
    },
    rest: {
      label: 'REST API v2',
      language: 'bash',
      code: `curl -X GET "https://api.velvetcms.io/v2/content/pages/autumn-editorial" \\
  -H "Authorization: Bearer sec_tok_live_9a7b76_5a2328" \\
  -H "Accept-Encoding: gzip, br" \\
  -H "Content-Type: application/json"`
    },
    typescript: {
      label: 'TypeScript SDK',
      language: 'typescript',
      code: `import { createClient } from '@velvet-cms/client';

const client = createClient({
  spaceId: 'space_studio_bordeaux',
  apiKey: process.env.VELVET_CMS_KEY,
  preview: false,
});

// Fully type-safe query with automatic schema inference
const page = await client.content('pages').findOne({
  slug: 'autumn-editorial-2026',
  select: ['title', 'blocks', 'seo', 'publishedAt']
});

console.log(page.blocks.map(b => b.title));`
    },
    nextjs: {
      label: 'Next.js App Router',
      language: 'tsx',
      code: `// app/editorial/[slug]/page.tsx
import { VelvetLiveStudio } from '@velvet-cms/next';
import { getEditorialBySlug } from '@/lib/velvet';

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getEditorialBySlug(params.slug);

  return (
    <VelvetLiveStudio
      initialData={data}
      theme="editorial-dark"
      enableLiveVisualEdits={process.env.NODE_ENV === 'development'}
    />
  );
}`
    }
  });
});

// Interactive CMS Studio Blocks Endpoints
app.get('/api/studio/blocks', async (req, res) => {
  try {
    if (isMongoConnected) {
      let page = await PageContent.findOne({ slug: 'home-preview' });
      if (!page) {
        page = await PageContent.create(inMemoryStore.pageContent);
      }
      return res.json(page);
    }
    return res.json(inMemoryStore.pageContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch studio content', details: error.message });
  }
});

app.put('/api/studio/blocks', async (req, res) => {
  try {
    const { blocks, title } = req.body;
    if (!blocks || !Array.isArray(blocks)) {
      return res.status(400).json({ error: 'Blocks array is required' });
    }

    if (isMongoConnected) {
      const updated = await PageContent.findOneAndUpdate(
        { slug: 'home-preview' },
        {
          blocks,
          title: title || inMemoryStore.pageContent.title,
          updatedAt: new Date(),
          $inc: { version: 1 }
        },
        { new: true, upsert: true }
      );
      return res.json({ success: true, data: updated });
    }

    // In-memory update
    inMemoryStore.pageContent.blocks = blocks;
    if (title) inMemoryStore.pageContent.title = title;
    inMemoryStore.pageContent.version += 1;
    inMemoryStore.pageContent.updatedAt = new Date().toISOString();

    return res.json({ success: true, data: inMemoryStore.pageContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update studio blocks', details: error.message });
  }
});

// Demo & Newsletter Lead Capture
app.post('/api/leads', async (req, res) => {
  try {
    const { email, name, company, type, role, message } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }

    const leadPayload = {
      id: `lead-${Date.now()}`,
      email,
      name: name || 'Valued Pioneer',
      company: company || 'Agency / Team',
      type: type || 'demo',
      role: role || 'Tech Lead',
      message: message || '',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const created = await Lead.create(leadPayload);
      return res.status(201).json({ success: true, message: 'Reservation confirmed! Our team will contact you.', lead: created });
    }

    inMemoryStore.leads.unshift(leadPayload);
    return res.status(201).json({
      success: true,
      message: 'Access pass reserved! Our team will connect with your credentials.',
      lead: leadPayload,
      database: 'in-memory-engine'
    });
  } catch (error) {
    res.status(500).json({ error: 'Submission failed', details: error.message });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leads = await Lead.find().sort({ createdAt: -1 }).limit(10);
      return res.json(leads);
    }
    return res.json(inMemoryStore.leads);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve leads' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Velvet CMS API Server running at http://localhost:${PORT}`);
});
