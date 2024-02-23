const defaultIndexTemplate = require('./svgr-index-template');

module.exports = {
  jsxRuntime: 'automatic',
  ref: true,
  indexTemplate: defaultIndexTemplate,
  typescript: true,
  ext: 'tsx',
  outDir: './src/components/Icons',
  icon: '1.5rem',
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'prefixIds',
      {
        name: 'sortAttrs',
        params: {
          xmlnsOrder: 'alphabetical',
        },
      },
    ],
  },
};
