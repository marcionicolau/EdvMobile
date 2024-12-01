import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ImageBackground, Text, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const DiagnosticCard = ({ item, onDelete, selected }) => !selected && (
<View style={styles.listItem}>
  <ImageBackground
    style={styles.listImage}
    source={{ uri: item.image.url }}
    imageStyle={styles.listInnerImage}
  >
    <View style={styles.diagnosticContainer}>
      <Text style={styles.diagnosticLabel}>{item.label}</Text>
    </View>

    <View style={styles.listFooter}>
      <View style={styles.informationContainer}>
        <Text style={styles.informationTitle}>Score</Text>
        <Text style={styles.informationValue}>
          {`${(parseFloat(item.score) * 100).toFixed(2)} %`}
        </Text>
      </View>
      <View style={styles.informationContainer}>
        <Icon name="map-marker-outline" size={25} style={styles.baseIcon} />
        <View style={styles.geoContainer}>
          <Text style={styles.geoPosition}>
            {parseFloat(item.longitude).toFixed(4)}
          </Text>
          <Text style={styles.geoPosition}>
            {parseFloat(item.latitude).toFixed(4)}
          </Text>
        </View>
      </View>

      <View style={styles.informationContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Icon
            name="trash-can-outline"
            size={25}
            style={styles.baseIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
</View>
);

DiagnosticCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onDelete: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default DiagnosticCard;
