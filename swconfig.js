module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.eot',
    'dist/**.svg',
    'dist/**.woff',
    'dist/**.woff2',
    'dist/**.ttf',
    'dist/assets/**/*.svg'
  ]
};
