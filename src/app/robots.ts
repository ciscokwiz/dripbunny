import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, ...(brand.siteUrl ? { sitemap: `${brand.siteUrl}/sitemap.xml` } : {}) }; }
