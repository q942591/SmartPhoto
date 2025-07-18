import createNextIntlPlugin from 'next-intl/plugin';
import './src/lib/env.mjs';

/* This path is supported by default: ./(src/)i18n/request.{js,jsx,ts,tsx} .
If you want to use a different path, you can pass a custom path to the plugin:
*/
const withNextIntlConfig = createNextIntlPlugin('./src/i18n/i18nServer.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    dirs: ['.'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lzhygldaxzrhqoxjyymc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withNextIntlConfig(nextConfig);
