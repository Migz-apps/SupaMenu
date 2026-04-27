const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix react-dom resolution for web
config.resolver.alias = {
  'react-dom$': 'react-dom',
  'react-dom/client$': 'react-dom/client',
};

// Fix asset handling
config.resolver.assetExts = [...config.resolver.assetExts, 'bin'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'json'];

// Fix server response headers
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Fix MIME type for JavaScript bundles
      if (req.url && req.url.includes('.bundle')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
