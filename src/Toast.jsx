import { useEffect } from 'react'
import { Transition } from '@headlessui/react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

export const Toast = ({
  open,
  setOpen,
  content,
  setContent,
  buttonClickHandler,
  duration = 4000,
  children,
  ...props
}) => {
  useEffect(() => {
    if (!open) return
    const shouldAutoClose =
      typeof duration === 'number' && Number.isFinite(duration) && duration > 0

    if (!shouldAutoClose) return

    const timer = setTimeout(() => {
      setContent(null)
      setOpen(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [open, duration, setContent, setOpen])

  const getRingClass = () => {
    switch (content?.type) {
      case 'error':
        return 'ring-red-700 dark:ring-red-300'
      case 'warning':
        return 'ring-yellow-700 dark:ring-yellow-300'
      case 'info':
        return 'ring-blue-700 dark:ring-blue-300'
      case 'success':
        return 'ring-green-700 dark:ring-green-300'
      default:
        return ''
    }
  }

  return createPortal(
    <>
      <div className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 z-[99999]">
        <div className="flex w-full max-h-full flex-col items-center space-y-4">
          <Transition show={open}>
            <div
              className={clsx(
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-900 ring-1 shadow-lg dark:shadow-gray-700 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0',
                getRingClass()
              )}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    {{
                      error: (
                        <ExclamationTriangleIcon
                          aria-hidden="true"
                          className="size-6 text-red-400 dark:text-red-600"
                        />
                      ),
                      warning: (
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-6 text-yellow-400 dark:text-yellow-600"
                        />
                      ),
                      info: (
                        <InformationCircleIcon
                          aria-hidden="true"
                          className="size-6 text-blue-400 dark:text-blue-600"
                        />
                      ),
                      success: (
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="size-6 text-green-400 dark:text-green-600"
                        />
                      ),
                    }[content?.type]}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {content?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {content?.subtitle}
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setContent(null)
                        setOpen(false)
                      }}
                      className="cursor-pointer inline-flex rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>,
    document.body
  )
}
