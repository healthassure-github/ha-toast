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

## Content shape

```js
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  subtitle: string
}
```

## Notes

- Uses Tailwind utility classes for styling; ensure Tailwind is configured in the consuming app.
- The toast renders into `document.body` via a React portal.
