# ha-toast

A simple, portal-based toast component extracted from the HA internal web app.

## Installation

```bash
npm install ha-toast
```

Peer requirements (install in your app):
- `react` >= 18
- `react-dom` >= 18

This package also depends on:
- `@headlessui/react`
- `@heroicons/react`
- `clsx`

## Usage

```jsx
import { useState } from 'react'
import { Toast } from 'ha-toast'

export default function App() {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastContent, setToastContent] = useState(null)

  const showSuccess = () => {
    setToastContent({
      type: 'success',
      title: 'Saved',
      subtitle: 'Your changes were saved.'
    })
    setToastOpen(true)
  }

  return (
    <>
      <button onClick={showSuccess}>Show toast</button>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        content={toastContent}
        setContent={setToastContent}
        duration={4000}
      />
    </>
  )
}
```

## Provider-based usage (no prop drilling)

```jsx
import { ToastProvider, ToastViewport, useToast } from 'ha-toast'

function App() {
  return (
    <ToastProvider duration={4000}>
      <ToastViewport />
      <Page />
    </ToastProvider>
  )
}

function Page() {
  const { showToast } = useToast()

  const onSave = () => {
    showToast({
      type: 'success',
      title: 'Saved',
      subtitle: 'Your changes were saved.'
    })
  }

  return <button onClick={onSave}>Save</button>
}
```

## Simpler usage with `useToastState`

```jsx
import { Toast, useToastState } from 'ha-toast'

export default function App() {
  const { toastProps, showToast } = useToastState({ duration: 4000 })

  const showSuccess = () => {
    showToast({
      type: 'success',
      title: 'Saved',
      subtitle: 'Your changes were saved.'
    })
  }

  const showErrorLonger = () => {
    showToast(
      { type: 'error', title: 'Oops', subtitle: 'Try again later.' },
      { duration: 7000 }
    )
  }

  return (
    <>
      <button onClick={showSuccess}>Show toast</button>
      <button onClick={showErrorLonger}>Show error</button>
      <Toast {...toastProps} />
    </>
  )
}
```

## Content shape

```js
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  subtitle: string
}
```

## Keep a toast open (no auto-close)

Pass `duration={null}` to disable the timer:

```jsx
showToast(
  { type: 'info', title: 'Working', subtitle: 'This will stay open.' },
  { duration: null }
)
```

Or, if you manage state manually:

```jsx
<Toast duration={null} ... />
```

## Notes

- Uses Tailwind utility classes for styling; ensure Tailwind is configured in the consuming app.
- The toast renders into `document.body` via a React portal.

## Build

This package bundles its UI dependencies into `dist/` and keeps `react`/`react-dom` as peer dependencies.

```bash
npm install
npm run build
```

Commit the generated `dist/` folder before publishing or installing from GitHub.
