import cors from 'cors';
import { config } from 'dotenv';

config();

const isDev = process.env.NODE_ENV === 'development';
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://*.local-credentialless.webcontainer-api.io'
];

if (!isDev && process.env.PRODUCTION_URL) {
  allowedOrigins.push(process.env.PRODUCTION_URL);
}

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = new RegExp(allowed.replace('*', '.*'));
        return pattern.test(origin);
      }
      return allowed === origin;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: [
    'Cross-Origin-Embedder-Policy',
    'Cross-Origin-Opener-Policy',
    'Cross-Origin-Resource-Policy'
  ],
  maxAge: 86400 // 24 hours
});