import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Sheet from './Sheet';

export default {
  title: 'Sheet',
  component: Sheet,
  argTypes: {
    placement: {
      control: { type: 'select', options: ['bottom', 'top', 'right', 'left'] },
      description: 'Sheet placement',
      defaultValue: 'bottom',
      table: {
        defaultValue: {
          summary: 'bottom',
        },
      },
    },
    size: {
      control: 'string',
      description: 'Sheet size',
      defaultValue: '25rem',
      table: {
        defaultValue: {
          summary: '25rem',
        },
      },
    },
    resizable: {
      control: 'boolean',
      description: 'Whether Sheet resizable or not',
      defaultValue: false,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    onResize: {
      action: 'onResize',
      description:
        'resize Sheet handler, called with current Sheet size as number (px)',
    },
    children: {
      disable: true,
      control: 'text',
      description: 'Sheet trigger',
    },
    content: {
      disable: true,
      control: 'text',
      description: 'Sheet content',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether close Sheet on Escape button press or not',
      defaultValue: true,
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    closeOnEnter: {
      control: 'boolean',
      description: 'Whether close Sheet on Enter button press or not',
      defaultValue: false,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    closeOnRemoteClick: {
      control: 'boolean',
      description: 'Whether close Sheet on remote click or not',
      defaultValue: true,
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    initialIsOpen: {
      control: 'boolean',
      description: 'Whether Sheet open on init or not',
      defaultValue: false,
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description:
        'Whether Sheet open or not (use if you want to control Sheet open state)',
    },
    onChangeOpen: {
      action: 'onChangeOpen',
      description: 'Handler, called when sheet should change opened state',
    },
    triggerContainerTag: {
      control: 'text',
      description: 'Sheet trigger container tag',
      defaultValue: 'div',
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
    usePortal: {
      control: 'boolean',
      description: 'Whether render Sheet into getContainer() or on place',
      defaultValue: true,
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    animation: {
      control: 'object',
      description: 'framer-motion animation props for opening/closing Sheet',
      defaultValue: Sheet.defaultProps.animation,
      table: {
        defaultValue: {
          summary: JSON.stringify(Sheet.defaultProps.animation),
        },
      },
    },
    getContainer: {
      control: 'function',
      description: 'Function, that returns Sheet container',
      table: {
        defaultValue: { summary: '() => document.body' },
      },
    },
    sideIndent: {
      control: 'text',
      description:
        'Intent from container side. (for example, if placement == "bottom", then indent from left and right sides)',
      defaultValue: '0',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    zIndex: {
      control: 'number',
      description: 'Sheet z-index',
      defaultValue: 100,
      table: {
        defaultValue: {
          summary: 100,
        },
      },
    },
    className: {
      control: 'text',
      description: 'Sheet className',
    },
  },
};

const Content = styled.div`
  padding: 2rem;
`;

export function Playground({ onChangeOpen, ...props }) {
  const [isOpen, setOpen] = useState();

  const handleChangeOpen = useCallback(
    (value) => {
      setOpen(value);
      onChangeOpen(value);
    },
    [onChangeOpen]
  );

  return (
    <Sheet
      {...props}
      isOpen={isOpen}
      onChangeOpen={handleChangeOpen}
      content={<Content>Sheet Content</Content>}
    >
      <button>Open Sheet</button>
    </Sheet>
  );
}

Playground.args = {};
