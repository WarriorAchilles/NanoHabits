const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add proper headers for SharedArrayBuffer support (expo-sqlite requirement)
  config.devServer = {
    ...config.devServer,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  };

  // Ensure proper handling of WebAssembly files for expo-sqlite
  config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
    syncWebAssembly: true,
  };

  // Add fallback for Node.js modules that might not be available in the browser
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
    crypto: false,
  };

  return config;
}; 