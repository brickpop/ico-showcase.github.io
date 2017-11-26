const webpack = require('webpack');

module.exports = {
  exportPathMap: function() {
    return {
			'/': { page: '/' },
			'/upcoming': { page: '/upcoming' }
    }
	},
	webpack: function (config) {
    config.plugins.push(
      new webpack.IgnorePlugin(/(fs|solc|require-from-string)/)
    )

    return config
  }
}
