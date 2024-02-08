import { useEffect, useCallback, useRef } from "react"

/**
 * A common react custom hook to check if the component is mounted.
 * @returns {() => boolean} - A function that returns true if the component is mounted.
 */
export function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
