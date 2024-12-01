// const { getDefaultConfig } = require('metro-config');

// module.exports = async () => {
//   const {
//     resolver: { assetExts },
//   } = await getDefaultConfig();
//   return {
//     resolver: {
//       assetExts: [...assetExts, 'pb', 'txt', 'jpg', 'jpeg'],
//     },
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//   };
// };

module.exports = {
  // resolver: {
  //   assetExts: ['pb', 'txt'],
  // },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
