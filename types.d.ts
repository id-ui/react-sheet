import * as React from 'react';

type VoidFunction = (...args: any[]) => void;

export interface SheetProps {
    /**
     * Function, that returns Sheet container
     * @default () => document.body
     */
    getContainer?: () => React.ReactNode;
     /**
     * Sheet placement
     * @default bottom
     */
     placement?: 'top' | 'bottom' | 'right' | 'left';
     /**
     * Intent from container side. (for example, if placement == "bottom", then indent from left and right sides)
     * @default '0'
     */
     sideIndent?: string;
     /**
     * Sheet className
     */
     className?: string;
     /**
     * Sheet z-index
     * @default 100
     */
     zIndex?: number;
     /**
     * Sheet trigger
     */
     children?: React.ReactChildren | (({ open: VoidFunction, close: VoidFunction, toggle: VoidFunction, isOpen: boolean }) => React.ReactChildren);
     /**
     * Sheet content
     */
     content?: React.ReactChildren | (({ close: VoidFunction }) => React.ReactChildren);
     /**
     * Whether close Sheet on Escape button press or not
     * @default true
     */
     closeOnEscape?: boolean;
     /**
     * Whether close Sheet on Enter button press or not
     * @default false
     */
     closeOnEnter?: boolean;
     /**
     * Whether close Sheet on remote click or not
     * @default true
     */
     closeOnRemoteClick?: boolean;
     /**
     * Whether Sheet open or not (use if you want to control Sheet open state)
     */
     isOpen?: boolean;
     /**
     * Handler, called when sheet should change opened state
     */
     onChangeOpen?: (isOpen: boolean) => void;
     /**
     * Sheet trigger container tag
     * @default 'div'
     */
     triggerContainerTag?: string,
     /**
     * Whether render Sheet into getContainer() or on place
     * @default true
     */
     usePortal?: boolean;
     /**
     * framer-motion animation props for opening/closing Sheet
     * @default { transition: { ease: 'easeInOut' } }
     */
     animation?: Object;
     /**
     * Sheet size (initial size if resizable)
     * @default '25rem'
     */
     size?: string,
     /**
     * Whether Sheet resizable or not
     * @default false
     */
     resizable?: boolean;
     /**
     * resize Sheet handler, called with current Sheet size as number (px)
     */
     onResize?: (size: number) => void;
}

export default class Sheet extends React.Component<SheetProps> {}