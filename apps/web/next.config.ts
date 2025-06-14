//for running dev server ot locally with npm run dev or serve command

import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

module.exports = {
  trailingSlash: false, // already there to handle route
  // swcMinify: true,
  compress: true,
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/Images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '70',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '0'
  },
  output: 'export',
  distDir: 'out',
  webpack (config: { optimization: { minimizer: OptimizeCssAssetsPlugin[] } }) {
    config.optimization.minimizer = []
    config.optimization.minimizer.push(new OptimizeCssAssetsPlugin({}))
    return config
  }
}
