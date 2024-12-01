import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Disease,
  DiseaseCount,
  DiseaseIcon,
  DiseaseText,
  InformationText,
  LegendContainer,
} from './styles';

import labelsFromNet from '~/helpers/labelsFromNet';

class DiagnosticLegend extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      labels: [],
    };
  }

  async componentDidMount() {
    const lbs = await labelsFromNet();
    this.setState({ labels: lbs });
  }

  displayLegend = (data, classes) => classes.map(
    (info, id) => this.generateLegendItem(data,
      info,
      id),
  );

  generateLegendItem = (contents, target, id) => {
    const baseInfo = contents.filter((info) => info.detectedClass === target);
    return baseInfo.length > 0 && (
      <Disease key={`disease-${id}`}>
        <DiseaseIcon main={id === 0} />
        <DiseaseText>{target}</DiseaseText>
        <DiseaseCount>{baseInfo.length}</DiseaseCount>
      </Disease>
    );
  };


  render() {
    const { recognitions } = this.props;
    const { labels } = this.state;

    return (
      <Container>
        {recognitions.length > 0
          ? (
            <LegendContainer>
              {this.displayLegend(recognitions, labels)}
            </LegendContainer>
          ) : (
            <InformationText>
              Nenhuma Detecção
            </InformationText>
          )}
      </Container>
    );
  }
}

DiagnosticLegend.propTypes = {
  recognitions: PropTypes.arrayOf(PropTypes.shape({
    detectedClass: PropTypes.string,
    confidenceInClass: PropTypes.number,
    rect: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      w: PropTypes.number,
      h: PropTypes.number,
    }),
  })).isRequired,
};

export default DiagnosticLegend;
