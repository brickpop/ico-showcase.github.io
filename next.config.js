const webpack = require('webpack');

module.exports = {
  exportPathMap: function() {
    return {
			'/': { page: '/' },
			// '/upcoming': { page: '/upcoming' }
    }
	},
	// assetPrefix: !debug ? 'https://anotherplanet-io.github.io/Next-React-Components/' : ''
}
