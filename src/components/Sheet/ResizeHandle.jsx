import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResizeHandle as ResizeHandleComponent } from './styled';

function ResizeHandle({ onChange, axis }) {
  const lastMousePositionRef = useRef();

  const [isResizing, setResizing] = useState(false);

  const handleStartResizing = useCallback(
    (e) => {
      if (e.button !== 0) {
        return;
      }

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      setResizing(true);
      lastMousePositionRef.current = e[`client${axis}`];
    },
    [axis]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        e.stopPropagation();

        const currentMousePosition = e[`client${axis}`];
        onChange(currentMousePosition - lastMousePositionRef.current);
        lastMousePositionRef.current = currentMousePosition;
      }
    },
    [axis, isResizing, onChange]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!isResizing) {
        return;
      }

      e.stopPropagation();

      setResizing(false);
    },
    [isResizing]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <ResizeHandleComponent onMouseDown={handleStartResizing} axis={axis} />
  );
}

export default ResizeHandle;
