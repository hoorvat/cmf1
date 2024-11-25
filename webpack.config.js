const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'custom_mf',

  exposes: {

    './Component': './src/bootstrap.ts', //name of exposed module must match name in shell app routing file
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }), //adjust as needed to share dependencies
  },

});
