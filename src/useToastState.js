import { useCallback, useMemo, useState } from 'react'

export const useToastState = (options = {}) => {
  const { duration: defaultDuration = 4000 } = options

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [duration, setDuration] = useState(defaultDuration)

  const showToast = useCallback(
    (nextContent, overrides = {}) => {
      if (!nextContent) return

      const nextDuration =
        typeof overrides.duration === 'number'
          ? overrides.duration
          : defaultDuration

      setDuration(nextDuration)
      setContent(nextContent)
      setOpen(true)
    },
    [defaultDuration]
  )

  const closeToast = useCallback(() => {
    setOpen(false)
    setContent(null)
  }, [])

  const toastProps = useMemo(
    () => ({
      open,
      setOpen,
      content,
      setContent,
      duration,
    }),
    [open, content, duration]
  )

  return {
    open,
    setOpen,
    content,
    setContent,
    duration,
    setDuration,
    showToast,
    closeToast,
    toastProps,
  }
}
