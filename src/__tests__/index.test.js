import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Sheet from 'components/Sheet';

const checkResizing = ({
  placement,
  expectedResult,
  mouseDownProps,
  mouseMoveProps,
}) => async () => {
  const onResize = jest.fn();

  const { getByText } = render(
    <Sheet
      initialIsOpen
      content={<span>content</span>}
      resizable
      onResize={onResize}
      placement={placement}
    >
      <button>open</button>
    </Sheet>
  );

  const content = getByText('content');

  const resizeHandler = content.nextElementSibling;

  fireEvent.mouseDown(resizeHandler, mouseDownProps);

  await waitFor(() => fireEvent.mouseMove(document, mouseMoveProps));

  await waitFor(() => fireEvent.mouseUp(document));

  if (expectedResult) {
    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith(expectedResult);
  } else {
    expect(onResize).toHaveBeenCalledTimes(0);
  }
};

describe('Sheet', () => {
  it('accessible', async () => {
    const { container } = render(<Sheet />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens on init if initialIsOpen', async () => {
    const { getByText } = render(
      <Sheet content={<span>content</span>} initialIsOpen>
        <button>open</button>
      </Sheet>
    );

    expect(getByText('content')).toBeInTheDocument();
  });

  it('opens/closes on trigger click', async () => {
    const { getByText, findByText, queryByText } = render(
      <Sheet content={<span>content</span>}>
        <button>open</button>
      </Sheet>
    );

    const button = getByText('open');
    user.click(button);

    expect(await findByText('content')).toBeInTheDocument();

    user.click(button);
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());
  });

  it('can be controlled by external component', async () => {
    const onChangeOpen = jest.fn();

    const { getByText, queryByText } = render(
      <Sheet
        content={<span>content</span>}
        onChangeOpen={onChangeOpen}
        isOpen={false}
      >
        <button>open</button>
      </Sheet>
    );

    const button = getByText('open');
    user.click(button);

    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());

    expect(onChangeOpen).toHaveBeenCalledTimes(1);
    expect(onChangeOpen).toHaveBeenCalledWith(true);
  });

  it('closes on remote click if trigger === "click"', async () => {
    const { getByText, findByText, queryByText } = render(
      <Sheet content={<span>content</span>} placement="top">
        <button>open</button>
      </Sheet>
    );
    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();

    const button = document.createElement('button');
    document.body.appendChild(button);
    fireEvent.mouseDown(button, { which: 1 });

    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());

    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();

    fireEvent.mouseDown(button, { which: 0 });
    expect(await findByText('content')).toBeInTheDocument();
  });

  it('closes on escape key press', async () => {
    const { getByText, queryByText, findByText } = render(
      <Sheet content={<span>content</span>} placement="right">
        <button>open</button>
      </Sheet>
    );
    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());
  });

  it('closes on enter key press', async () => {
    const { getByText, queryByText, findByText } = render(
      <Sheet
        closeOnEnter={true}
        content={<span>content</span>}
        placement="left"
        usePortal={false}
      >
        <button>open</button>
      </Sheet>
    );
    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Enter' });
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());
  });

  it('does not close on any button press (except for buttons in props)', async () => {
    const { getByText, findByText } = render(
      <Sheet content={<span>content</span>} closeOnEnter>
        <button>open</button>
      </Sheet>
    );
    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Shift', code: 'Shift' });
    expect(await findByText('content')).toBeInTheDocument();
  });

  it('can be controlled by children function', async () => {
    const { getByText, findByText, queryByText, getByTestId } = render(
      <Sheet content={<span>content</span>} closeOnEscape={false}>
        {({ open, close, toggle }) => (
          <div data-testid="trigger">
            <button onClick={open}>open</button>
            <button onClick={close}>close</button>
            <button onClick={toggle}>toggle</button>
          </div>
        )}
      </Sheet>
    );

    const trigger = getByTestId('trigger');

    user.click(trigger);
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());

    user.click(getByText('close'));
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());

    user.click(getByText('open'));
    expect(await findByText('content')).toBeInTheDocument();

    user.click(trigger);
    await waitFor(() => expect(getByText('content')).toBeInTheDocument());

    user.click(getByText('open'));
    await waitFor(() => expect(getByText('content')).toBeInTheDocument());

    user.click(getByText('close'));
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());

    user.click(getByText('toggle'));
    expect(await findByText('content')).toBeInTheDocument();

    user.click(getByText('toggle'));
    await waitFor(() => expect(queryByText('content')).not.toBeInTheDocument());
  });

  it('can be closed by content function', async () => {
    const { getByText, findByText, queryByText } = render(
      <Sheet
        content={({ close }) => (
          <span>
            <button onClick={close}>close</button>
          </span>
        )}
      >
        <button>open</button>
      </Sheet>
    );

    user.click(getByText('open'));

    expect(await findByText('close')).toBeInTheDocument();

    user.click(getByText('close'));
    await waitFor(() => expect(queryByText('close')).not.toBeInTheDocument());
  });

  it(
    'resizable if placement === "bottom"',
    checkResizing({
      placement: 'bottom',
      mouseDownProps: {
        button: 0,
        clientY: 150,
      },
      mouseMoveProps: {
        clientY: 100,
      },
      expectedResult: 50,
    })
  );

  it(
    'resizable if placement === "top"',
    checkResizing({
      placement: 'top',
      mouseDownProps: {
        button: 0,
        clientY: 0,
      },
      mouseMoveProps: {
        clientY: 100,
      },
      expectedResult: 100,
    })
  );

  it(
    'resizable if placement === "left"',
    checkResizing({
      placement: 'left',
      mouseDownProps: {
        button: 0,
        clientX: 0,
      },
      mouseMoveProps: {
        clientX: 100,
      },
      expectedResult: 100,
    })
  );

  it(
    'resizable if placement === "right"',
    checkResizing({
      placement: 'right',
      mouseDownProps: {
        button: 0,
        clientX: 150,
      },
      mouseMoveProps: {
        clientX: 100,
      },
      expectedResult: 50,
    })
  );

  it(
    'does not start resizing on left mouse button click',
    checkResizing({
      placement: 'bottom',
      mouseDownProps: {
        button: 1,
        clientY: 150,
      },
      mouseMoveProps: {
        clientY: 100,
      },
    })
  );
});
