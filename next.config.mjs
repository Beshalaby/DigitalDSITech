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
   assetPrefix: '',
   basePath: '',
   trailingSlash: true,
   webpack: (config) => {
     config.module.rules.push({
       test: /\.(png|jpg|gif|svg|avif)$/,
       use: {
         loader: 'file-loader',
         options: {
           publicPath: '/',
           outputPath: 'images/',
           name: '[path][name].[ext]',
         },
       },
     });
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