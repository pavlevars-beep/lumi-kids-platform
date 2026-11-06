import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { workshops } from '../data/workshops';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog');
  const urls = [
    ['/', '1.0'], ['/radionice', '0.9'], ['/blog', '0.8'],
    ...workshops.map((w) => [`/radionice/${w.slug}`, '0.7']),
    ...posts.map((p) => [`/blog/${p.id}`, '0.7', (p.data.updated || p.data.date).toISOString().slice(0, 10)]),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(([u, pr, lm]) => `  <url><loc>${new URL(u!, site)}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}<priority>${pr}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
