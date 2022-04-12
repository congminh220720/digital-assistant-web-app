const path = require('path')

module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      _pages: path.resolve('src/pages'),
      _img: path.resolve('src/assets/img'),
      _fonts: path.resolve('src/assets/fonts'),
      _styles: path.resolve('src/assets/css'),
      _components: path.resolve('src/components'),
      _api: path.resolve('src/api'),
      _utils: path.resolve('src/utils'),
      _hooks: path.resolve('src/hooks'),
      _layout: path.resolve('src/layout'),
      _redux: path.resolve('src/redux'),
    }

    config.plugins = config.plugins || []

    return config
  },
}
