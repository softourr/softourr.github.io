import type { APIRoute } from 'astro'

// const robotsTxt = `
// User-agent: *
// Allow: /

// Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
// `.trim()

// export const GET: APIRoute = () => {
//   return new Response(robotsTxt, {
//     headers: {
//       'Content-Type': 'text/plain; charset=utf-8',
//     },
//   })
// }

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};