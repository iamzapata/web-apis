import { useReadCSSVariable } from "./useReadCSSVariable"
import { renderHook } from "@testing-library/react"

describe("useReadCSSVariable", () => {
  it("should return empty string if the variable is not set", () => {
    const { result } = renderHook(() => useReadCSSVariable("--test"))

    expect(result.current).toBe("")
  })

  it("should return the value of the variable if it is set in document root by default", () => {
    document.documentElement.style.setProperty("--test", "test")

    const { result } = renderHook(() => useReadCSSVariable("--test"))

    expect(result.current).toBe("test")
  })

  it("it should return the value of the variable if set on the element passed as second argument", () => {
    const el = document.createElement("div")
    el.style.setProperty("--test", "abc")
    document.documentElement.appendChild(el)

    const { result } = renderHook(() => useReadCSSVariable("--test", el))

    expect(result.current).toBe("abc")
  })
})
