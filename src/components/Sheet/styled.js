import styled, { css } from 'styled-components';
import { ifProp, prop, switchProp } from 'styled-tools';
import { motion } from 'framer-motion';

export const ResizeHandle = styled.div`
  position: absolute;
  cursor: ${ifProp({ axis: 'Y' }, 'ns-resize', 'ew-resize')};
`;

export const Container = styled(motion.div)`
  position: absolute;
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.23),
    0 0.4rem 0.5rem rgba(0, 0, 0, 0.09), 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1),
    0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
  z-index: ${prop('zIndex')};
  overflow: auto;
  background-color: white;
  ${switchProp('placement', {
    top: css`
      top: 0;
      left: ${prop('sideIndent')};
      right: ${prop('sideIndent')};
      min-height: ${prop('size')};
      ${ResizeHandle} {
        right: 0;
        left: 0;
        bottom: 0;
        height: 1rem;
      }
    `,
    bottom: css`
      bottom: 0;
      left: ${prop('sideIndent')};
      right: ${prop('sideIndent')};
      min-height: ${prop('size')};
      ${ResizeHandle} {
        right: 0;
        left: 0;
        top: 0;
        height: 1rem;
      }
    `,
    left: css`
      left: 0;
      top: ${prop('sideIndent')};
      bottom: ${prop('sideIndent')};
      min-width: ${prop('size')};
      ${ResizeHandle} {
        top: 0;
        bottom: 0;
        right: 0;
        width: 1rem;
      }
    `,
    right: css`
      right: 0;
      top: ${prop('sideIndent')};
      bottom: ${prop('sideIndent')};
      min-width: ${prop('size')};
      ${ResizeHandle} {
        top: 0;
        bottom: 0;
        left: 0;
        width: 1rem;
      }
    `,
  })};
`;
