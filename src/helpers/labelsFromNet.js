import RNFS from 'react-native-fs';

const labelsFromNet = async () => {
  const labelsPath = 'nnets/deepspot_yolo_classes.txt';

  const finalClasses = RNFS.readFileAssets(labelsPath).then((content) => {
    const listClasses = content.split('\n');
    return listClasses.filter((x) => x.length > 0);
  }).catch(() => []);

  return finalClasses;
};

export default labelsFromNet;
