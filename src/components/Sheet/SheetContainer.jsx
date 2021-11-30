import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import Sheet from './Sheet';

function SheetContainer({
  initialIsOpen,
  isOpen: providedIsOpen,
  onChangeOpen,
  ...props
}) {
  const [isOpen, setOpen] = useState(initialIsOpen);

  const isOpenControlled = !_.isUndefined(providedIsOpen);

  const handleChangeOpen = useCallback(
    (value) => {
      onChangeOpen(value);
      if (!isOpenControlled) {
        setOpen(value);
      }
    },
    [isOpenControlled, onChangeOpen]
  );

  return (
    <Sheet
      {...props}
      isOpen={isOpenControlled ? providedIsOpen : isOpen}
      onChangeOpen={handleChangeOpen}
    />
  );
}

SheetContainer.propTypes = Sheet.propTypes;
SheetContainer.defaultProps = Sheet.defaultProps;

export default SheetContainer;
