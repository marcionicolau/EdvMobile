import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/assets';

export default StyleSheet.create({
  annotationFill: {
    width: metrics.annotationSize - 3,
    height: metrics.annotationSize - 3,
    borderRadius: (metrics.annotationSize - 3) / 2,
    backgroundColor: colors.primary2,
    transform: [{ scale: 0.6 }],
  },
});
