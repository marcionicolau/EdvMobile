import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { Container } from './styles';

class Bubble extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  render() {
    const { children, onPress } = this.props;
    let innerChildView = children;

    if (onPress) {
      innerChildView = (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      );
    }

    return <Container>{innerChildView}</Container>;
  }
}

export default Bubble;
