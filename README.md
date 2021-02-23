# Sheet React Component

[![NPM](https://img.shields.io/npm/v/@idui/react-sheet.svg)](https://www.npmjs.com/package/@idui/react-sheet/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-sheet)](https://www.npmjs.com/package/@idui/react-sheet)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-sheet/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-sheet?branch=main)
[![LICENSE](https://img.shields.io/github/license/id-ui/react-sheet)](https://github.com/id-ui/react-sheet/blob/main/LICENSE)

- [Docs](https://id-ui.github.io/react-sheet/?path=/docs/sheet--playground)
- [Playground](https://id-ui.github.io/react-sheet/?path=/story/sheet--playground)

## Install

```bash
npm install --save @idui/react-sheet
```

```bash
yarn add @idui/react-sheet
```

### Advantages
- can be resizable
- uses styled-components
- has 4 different placements (bottom, top, right, left)
- can be controlled by children function
- can be closed by content function


### See props in [Docs](https://id-ui.github.io/react-sheet/?path=/docs/sheet--playground)


### Basic Example

```jsx
import React from 'react'
import Sheet from '@idui/react-sheet'

function Example() {
    return <Sheet 
        content={<span>Sheet Content</span>}
    >
        <button>Open Sheet</button>
    </Sheet>
}
```

### Resizable Sheet

```jsx
import React from 'react'
import Sheet from '@idui/react-sheet'

function Example() {
    return <Sheet 
        content={<span>Sheet Content</span>}
        resizable
        onResize={(size) => console.log(`New sheet size = ${size}px`)}
    >
        <button>Open Sheet</button>
    </Sheet>
}
```

### Controlled isOpen state

```jsx
import React from 'react'
import Sheet from '@idui/react-sheet'

function Example() {
    return <Sheet 
        content={({close}) => <button onClick={close}>close</button>}
        resizable
    >
        {({open, close, toggle}) => <div>
            <button onClick={open}>open</button>
            <button onClick={close}>close</button>
            <button onClick={toggle}>toggle</button>
        </div>}
    </Sheet>
}
```

### See more details in [storybook](https://id-ui.github.io/react-sheet/?path=/docs/sheet--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)