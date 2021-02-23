import React, { Fragment, useMemo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { Container } from './styled';
import ResizeHandle from './ResizeHandle';
import useOpen from './hooks/useOpen';
import { animationCoefficientsMapping } from './config';

function Sheet({
  children,
  content,
  getContainer,
  closeOnEscape,
  closeOnEnter,
  isOpen,
  onChangeOpen,
  closeOnRemoteClick,
  triggerContainerTag,
  usePortal,
  zIndex,
  size: providedSize,
  sideIndent,
  className,
  animation,
  placement,
  resizable,
  onResize,
}) {
  const { addTarget, open, close, toggle } = useOpen({
    closeOnRemoteClick,
    closeOnEscape,
    closeOnEnter,
    isOpen,
    onChangeOpen,
  });

  const setTriggerRef = useCallback(
    (node) => {
      addTarget('trigger', node);
    },
    [addTarget]
  );

  const contentRef = useRef();

  const setContentRef = useCallback(
    (node) => {
      addTarget('content', node);
      contentRef.current = node;
    },
    [addTarget]
  );

  const [size, setSize] = useState(providedSize);

  const TriggerContainer = triggerContainerTag;

  const container = getContainer();

  const animationCoefficients = animationCoefficientsMapping[placement];

  const handleResize = useCallback(
    (diff) => {
      let newSize =
        contentRef.current[
          animationCoefficients.axis === 'y' ? 'clientHeight' : 'clientWidth'
        ];

      switch (placement) {
        case 'top':
        case 'left':
          newSize += diff;
          break;
        case 'bottom':
        case 'right':
          newSize -= diff;
          break;
      }

      setSize(`${newSize}px`);
      onResize(newSize);
    },
    [animationCoefficients.axis, onResize, placement]
  );

  const animationProps = {
    ...animation,
    initial: {
      ...animation.initial,
      [animationCoefficients.axis]: `${animationCoefficients.sign * 100}%`,
    },
    animate: {
      ...animation.animate,
      [animationCoefficients.axis]: 0,
    },
    exit: {
      ...animation.exit,
      [animationCoefficients.axis]: `${animationCoefficients.sign * 100}%`,
    },
  };

  const transformedContent = useMemo(
    () => (typeof content === 'function' ? content({ close }) : content),
    [content, close]
  );

  const popoverContentAnimated = (
    <AnimatePresence initial={null}>
      {isOpen && (
        <Container
          key="sheet-content"
          ref={setContentRef}
          {...animationProps}
          className={className}
          zIndex={zIndex}
          placement={placement}
          sideIndent={sideIndent}
          size={size}
        >
          {transformedContent}
          {resizable && (
            <ResizeHandle
              onChange={handleResize}
              axis={animationCoefficients.axis.toUpperCase()}
            />
          )}
        </Container>
      )}
    </AnimatePresence>
  );

  const isOpenableByChildren = typeof children === 'function';

  return (
    <Fragment>
      {usePortal
        ? container && createPortal(popoverContentAnimated, container)
        : popoverContentAnimated}
      <TriggerContainer
        ref={setTriggerRef}
        onClick={isOpenableByChildren ? undefined : toggle}
      >
        {isOpenableByChildren
          ? children({ isOpen, open, close, toggle })
          : children}
      </TriggerContainer>
    </Fragment>
  );
}

Sheet.propTypes = {
  getContainer: PropTypes.func,
  placement: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
  sideIndent: PropTypes.string,
  className: PropTypes.string,
  zIndex: PropTypes.number,
  children: PropTypes.any,
  content: PropTypes.any,
  closeOnEscape: PropTypes.bool,
  closeOnEnter: PropTypes.bool,
  closeOnRemoteClick: PropTypes.bool,
  isOpen: PropTypes.bool,
  onChangeOpen: PropTypes.func,
  triggerContainerTag: PropTypes.string,
  usePortal: PropTypes.bool,
  animation: PropTypes.object,
  size: PropTypes.string,
  resizable: PropTypes.bool,
  onResize: PropTypes.func,
};

Sheet.defaultProps = {
  getContainer: () => document.body,
  placement: 'bottom',
  sideIndent: '0',
  zIndex: 100,
  closeOnEscape: true,
  closeOnEnter: false,
  closeOnRemoteClick: true,
  triggerContainerTag: 'div',
  usePortal: true,
  animation: {
    transition: { ease: 'easeInOut' },
  },
  size: '25rem',
  onChangeOpen: () => {},
  onResize: () => {},
  resizable: false,
};

export default Sheet;
