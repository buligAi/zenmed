import { config } from 'dotenv';

config();

const isDev = process.env.NODE_ENV === 'development';
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://*.local-credentialless.webcontainer-api.io'
];

export const securityHeaders = (req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && (allowedOrigins.includes(origin) || 
      (origin.endsWith('.local-credentialless.webcontainer-api.io')))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (!isDev) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
}