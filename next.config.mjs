let userConfig = undefined
 try {
   userConfig = await import('./v0-user-next.config')
 } catch (e) {
   // ignore error
 }
 
 /** @type {import('next').NextConfig} */
 const nextConfig = {
   eslint: {
     ignoreDuringBuilds: true,
   },
   typescript: {
     ignoreBuildErrors: true,
   },
   images: {
     unoptimized: true,
     domains: ['raw.githubusercontent.com'],
   },
   experimental: {
     webpackBuildWorker: true,
     parallelServerBuildTraces: true,
     parallelServerCompiles: true,
   },
   output: 'export',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/DigitalDSITech/' : '',
   basePath: process.env.NODE_ENV === 'production' ? '/DigitalDSITech' : '',
   trailingSlash: true,
   webpack: (config) => {
     return config;
   },
 }
 
 mergeConfig(nextConfig, userConfig)
 
 function mergeConfig(nextConfig, userConfig) {
   if (!userConfig) {
     return
   }
 
   for (const key in userConfig) {
     if (
       typeof nextConfig[key] === 'object' &&
       !Array.isArray(nextConfig[key])
     ) {
       nextConfig[key] = {
         ...nextConfig[key],
         ...userConfig[key],
       }
     } else {
       nextConfig[key] = userConfig[key]
     }
   }
 }
 
 export default nextConfig