import React, { useEffect, useRef, useState } from 'react';
import { ResizeHandle as ResizeHandleComponent } from './styled';

function ResizeHandle({ onChange, axis }) {
  const lastMousePositionRef = useRef();

  const [isResizing, setResizing] = useState(false);

  const handleStartResizing = (e) => {
    if (e.button !== 0) {
      return;
    }

    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setResizing(true);
    lastMousePositionRef.current = e[`client${axis}`];
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        e.stopPropagation();

        const currentMousePosition = e[`client${axis}`];
        onChange(currentMousePosition - lastMousePositionRef.current);
        lastMousePositionRef.current = currentMousePosition;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [axis, isResizing, onChange]);

  useEffect(() => {
    const handleMouseUp = (e) => {
      if (!isResizing) {
        return;
      }

      e.stopPropagation();

      setResizing(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <ResizeHandleComponent onMouseDown={handleStartResizing} axis={axis} />
  );
}

export default ResizeHandle;
