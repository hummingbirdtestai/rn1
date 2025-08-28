const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add JSON support for imports
config.resolver.sourceExts.push('json');

// Ensure proper resolver configuration
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = withNativeWind(config, { input: './global.css' });