import React from 'react';
import PropTypes from 'prop-types';

import { BoxDetection, BoxesContainer, BoxScore } from './styles';

const RenderBoxesView = ({ recognitions, image, mask }) => {
  const w = image.width;
  const h = image.height;
  const imgHeight = h * mask.height / w;
  const imgWidth = mask.width;


  return (
    <BoxesContainer>
      {recognitions.map((res, id) => {
        const left = res.rect.x * imgWidth;
        const top = res.rect.y * imgHeight;
        const width = res.rect.w * imgWidth;
        const height = res.rect.h * imgHeight;

        return (
          <BoxDetection key={id} left={left} top={top} width={width} height={height}>
            <BoxScore>
              {`${res.detectedClass} (${(res.confidenceInClass * 100).toFixed(0)}%)`}
            </BoxScore>
          </BoxDetection>
        );
      })}
    </BoxesContainer>
  );
};

RenderBoxesView.propTypes = {
  recognitions: PropTypes.arrayOf(
    PropTypes.shape({
      detectedClass: PropTypes.string,
      confidenceInClass: PropTypes.number,
    }),
  ).isRequired,
  mask: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  image: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};


export default RenderBoxesView;

//               {`${res.detectedClass} (${(res.confidenceInClass * 100).toFixed(0)}%)`}
