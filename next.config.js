const webpack = require('webpack');

module.exports = {
  exportPathMap: function() {
    return {
			'/': { page: '/' },
			'/upcoming': { page: '/upcoming' }
    }
	}
}
