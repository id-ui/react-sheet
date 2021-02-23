import { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';

export default ({
  closeOnEscape,
  closeOnEnter,
  closeOnRemoteClick,
  isOpen,
  onChangeOpen,
}) => {
  const targetsMap = useRef({});
  const parentNode = useRef(document.body);

  const addTarget = useCallback((name, node) => {
    targetsMap.current[name] = node;
  }, []);

  const updateOpen = useCallback(
    (value) => {
      if (isOpen !== value) {
        onChangeOpen(value);
      }
    },
    [onChangeOpen, isOpen]
  );

  const open = useCallback(() => {
    updateOpen(true);
  }, [updateOpen]);

  const close = useCallback(() => {
    updateOpen(false);
  }, [updateOpen]);

  const toggle = useCallback(() => {
    updateOpen(!isOpen);
  }, [isOpen, updateOpen]);

  useEffect(() => {
    if (!closeOnRemoteClick || !isOpen) {
      return;
    }

    const remoteClickListener = (e) => {
      if ((e.which || e.button) !== 1) {
        return;
      }

      if (parentNode.current && !parentNode.current.contains(e.target)) {
        return;
      }

      const targets = _.values(targetsMap.current).filter(Boolean);
      if (!targets.find((item) => item.contains(e.target))) {
        close();
      }
    };

    document.addEventListener('mousedown', remoteClickListener);

    return () => {
      document.removeEventListener('mousedown', remoteClickListener);
    };
  }, [close, closeOnRemoteClick, isOpen]);

  useEffect(() => {
    if (!closeOnEscape && !closeOnEnter) {
      return;
    }

    if (!isOpen) {
      return;
    }

    const keyDownListener = (e) => {
      if (
        [closeOnEscape && 'Escape', closeOnEnter && 'Enter'].includes(e.key)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', keyDownListener);

    return () => {
      document.removeEventListener('keydown', keyDownListener);
    };
  }, [close, closeOnEnter, closeOnEscape, isOpen]);

  return {
    setOpen: updateOpen,
    open,
    close,
    toggle,
    addTarget,
    parentNode,
  };
};
