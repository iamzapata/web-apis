import { useEffect, useState } from "react"

const useReadCSSVariable = (
  variableName: string,
  el: HTMLElement | null = document.documentElement
) => {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    if (el) {
      const value = getComputedStyle(el).getPropertyValue(variableName).trim()
      console.warn({ el, value })
      setValue(value)
    }
  }, [variableName, el])

  return value
}

export { useReadCSSVariable }
