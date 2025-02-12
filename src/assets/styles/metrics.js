import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseMargin: 10,
  basePadding: 20,
  baseRadius: 8,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,

  annotationSize: 45,
};
